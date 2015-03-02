var able = require('able')

exports.register = function (server, options, next) {
  able(
    options.dir,
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
      next()
    }
  )
}

exports.register.attributes = {
  pkg: require('./package.json')
}
