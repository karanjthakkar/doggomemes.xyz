const queryString = require('query-string');
const uuidV4 = require('uuid');
const fs = require('fs');
const Path = require('path');

const IMAGE_FILE_FORMAT = 'png';

const make = async (Page, options, callback) => {
  const { text, backgroundId, name = uuidV4() } = options;
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
  callback(null, {
    success: true,
    image_name: `${name}.${IMAGE_FILE_FORMAT}`
  });
};

module.exports = {
  make
};
