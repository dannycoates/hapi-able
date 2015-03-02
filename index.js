var able = require('able')
var path = require('path')

exports.register = function (server, options, next) {
  able.load(
    path.resolve(process.cwd(), options.dir || './experiments'),
    options.git,
    function (err, project) {
      if (err) { return next(err) }
      server.ext(
        'onPreHandler',
        function (request, reply) {
          request.plugins.able = project.ab()
          return reply.continue()
        }
      )
      if (options.clientEnabled) {
        server.route(
          {
            method: 'GET',
            path: '/experiments.bundle.js',
            handler: function (req, reply) {
              reply(
                project.bundle(
                  {
                    clientAddress: req.info.remoteAddress
                  }
                )
              ).type('application/javascript')
            }
          }
        )
      }
      next()
    }
  )
}

exports.register.attributes = {
  pkg: require('./package.json')
}
