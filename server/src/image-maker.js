const queryString = require('query-string');
const uuidV4 = require('uuid');
const fs = require('fs');
const Path = require('path');

const TaskManager = require('./task-manager');

const IMAGE_FILE_FORMAT = 'png';

const _generate = async task => {
  const { Page, text, backgroundId, name = uuidV4(), callback } = task;
  const queryParams = queryString.stringify({
    text,
    backgroundId
  });
  await Page.navigate({
    url: `file://${Path.resolve(
      __dirname,
      '../page'
    )}/index.html?${queryParams}`
  });

  // Fires when all assets have finished loading
  // This includes js, css, images, ads, etc.
  await Page.loadEventFired();

  // Capture screenshot in png format.
  // This can also be `jpeg` which allows it to have
  // a quality factor of 0-100 to be specified as well.
  const { data } = await Page.captureScreenshot({
    format: IMAGE_FILE_FORMAT
  });
  fs.writeFileSync(
    Path.resolve(__dirname, `../out/${name}.${IMAGE_FILE_FORMAT}`),
    Buffer.from(data, 'base64')
  );

  // Send the response down the wire and pick up the next task
  callback(null, {
    success: true,
    image_name: `${name}.${IMAGE_FILE_FORMAT}`
  });
};

const process = (Page, options, callback) => {
  const { text, backgroundId, name } = options;
  TaskManager.createTask({
    taskFn: _generate,
    taskData: {
      Page,
      text,
      backgroundId,
      name,
      callback
    }
  });
  if (TaskManager.isTaskQueueStopped) {
    TaskManager.pickNextTask();
  }
};

module.exports = {
  process
};
