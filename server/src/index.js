'use strict';

const CDP = require('chrome-remote-interface');
const ChromeLauncher = require('chrome-launcher');
const server = require('./server');

ChromeLauncher.launch({
  port: 9222,
  chromeFlags: ['--headless', '--disable-gpu', '--window-size=1280,1280']
})
  .then(() => {
    CDP().then(
      async client => {
        const { Page, Emulation } = client;

        // Enables page domain notifications.
        await Page.enable();

        // Only start server if image maker is ready
        server.init(Page);
      },
      err => {
        console.log('Error with remote interface', err);
      }
    );
  })
  .catch(err => {
    console.log('Error with launcher', err);
  });
