module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI', encodeURIComponent(process.env.DATABASE_URI)||"http://127.0.0.1:27017/jrmeDatabase"),
        srv: env.bool('DATABASE_SRV', process.env.srv ? true : false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', process.env.nameDB||'jrmeDatabase')
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
