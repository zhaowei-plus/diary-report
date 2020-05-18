'use strict';

module.exports = {
  security: {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  },
  cors: {
    origin: '*', // 允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  mongoose: {
    url: 'mongodb://127.0.0.1/report',
    options: {},
  },
  jwt: {
    secret: '888888',
  },
  // redis: {
  //   client: {
  //     port: 6380,
  //     host: '127.0.0.1',
  //     password: 'auth',
  //     db: 0,
  //   },
  // },
}
