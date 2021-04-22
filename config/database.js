module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', process.env.hostDB || '127.0.0.1'),
        srv: env.bool('DATABASE_SRV', process.env.srv ? true : false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', process.env.nameDB||'jrmeDatabase'),
        username: env('DATABASE_USERNAME', process.env.userDB || 'geek'),
        password: env('DATABASE_PASSWORD', process.env.passDB || 'Djansan@2003'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});
