const _       = require('lodash');
const Compute = require('@google-cloud/compute');

const constant = require('./src/constant');
const db       = require('./src/db');

const compute = new Compute();
const zone    = compute.zone('us-west3-a');
const vm      = zone.vm('encoder');

async function startEncoder(gsData) {
  const videoName = _.get(gsData, 'name');
  if (!videoName) {
    console.error('No video name found');
    return;
  }
  console.log(`Received message for ${videoName}`);

  try {
    await db.upsertFileName(videoName);
  } catch (err) {
    console.error(`Error adding filename to transcode backlog: ${err.toString()}`);
    return;
  }

  const encoder = await getEncoderVm();

  if (!encoder) {
    console.error('Encoder VM does not exist');
    return;
  }

  const encoderStatus = _.get(encoder, 'metadata.status', '');
  console.log(`Encoder VM status: ${encoderStatus}`);

  if (constant.runningVmStates.includes(encoderStatus)) {
    console.log('Encoder VM is already running');
    return;
  }

  console.log('Starting up encoder VM');
  await startEncoderVm();
}

async function getEncoderVm() {
  try {
    const vms = await vm.get();
    vms.filter(vm => {
      const id   = _.get(vm, 'id', '');
      const name = _.get(vm, 'name', '');

      return id === 'encoder' && name === 'encoder';
    });

    return _.get(vms, '[0]');
  } catch (err) {
    console.error(`Error retrieving encoder VM data: ${err.toString()}`);
  }
}

async function startEncoderVm() {
  try {
    await vm.start();
  } catch (err) {
    console.error(`Error starting encoder VM: ${err.toString()}`);
  }
}

module.exports = startEncoder;
