const Hapi = require('hapi');
const Path = require('path');
const imageMaker = require('./image-maker');

const init = Page => {
  // Create a server with a host and port
  const server = new Hapi.Server({
    connections: {
      routes: {
        files: {
          relativeTo: Path.join(__dirname, '/')
        }
      }
    }
  });
  server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8111
  });

  // Route for image generation based on payload options
  server.route({
    method: 'POST',
    path: '/create/image',
    handler(request, reply) {
      const backgroundId = request.payload['backgroundId'],
        text = request.payload['text'],
        name = request.payload['name'];

      imageMaker.make(
        Page,
        {
          text,
          backgroundId,
          name
        },
        (err, data) => {
          reply(data).code(200);
        }
      );
    }
  });

  // Start the server
  server.start(() => {
    console.log('Server started', server.info.uri);
  });
};

module.exports = {
  init
};
