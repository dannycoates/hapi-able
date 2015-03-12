hapi-able
=========

A [hapi](http://hapijs.com) plugin to add [Able](https://www.npmjs.com/package/able) A/B testing.

# Example

```js
var server = new hapi.Server()

server.register(
  {
    register: require('hapi-able'),
    options: {
      dir: './experiments',
      git: 'git://github.com/dannycoates/able-demo.git#master',
      addRoutes: true,
      watch: true
    }
  },
  function (err) {
    if (err) {
      console.error('plugin error', err)
      process.exit(8)
    }
  }
)

server.route(
  {
    path: '/foo',
    handler: function (request, reply) {
      reply(request.plugins.able.choose('bar'))
    }
  }
)
```

## Registration Options

- **dir** : *optional* directory where experiments are stored. Defaults to `./experiments` in the current working directory.
- **git** : *optional* a github url to watch for experiment changes.
- **addRoutes** : *optional* adds routes for using Able from a client browser. Defaults to `false`.
- **watch** : *optional* poll git for changes to experiments. Defaults to `false`.
