'use strict';

const koajwt = require("koa-jwt2");

/*
 * 路由配置，用于描述请求URL和具体承担执行的Controller的对应关系
 */
module.exports = app => {
  const { router, controller, config } = app;
  const { home, user, diary } = controller

  // router.get('/', controller.home.index);
  // router.get('/list', controller.home.list);

  router.post('/user/login', user.login);
  router.post('/user/register', user.register);

  router.post('/diary/add', diary.add);
  router.get('/diary/getByWeek', diary.getByWeek);
  router.get('/diary/getByWeeks', diary.getByWeeks);
  router.get('/diary/detail/:id', diary.detail);
  router.post('/diary/update', diary.update);
  router.post('/diary/delete', diary.delete);


  // 接口学习
  router.post('/login', home.login);
  router.get('/user-info', home.userInfo);

  // 借助koa-jwt2删除token
  const isRevokedAsync = function(req, payload) {
    return new Promise(resolve => {
      try {
        const userId = payload.id;
        const tokenKey = `token_${userId}`;
        const token = app.redis.get(tokenKey);
        if (token) {
          app.redis.del(tokenKey);
        }
        resolve(false);
      } catch (e) {
        resolve(true);
      }
    });
  };

  // router.post 可以接受中间件，用来处理路由相关的的特殊逻辑
  router.post('/logout',
    koajwt({
      secret: config.jwt.secret,
      credentialsRequired: false,
      isRevoked: isRevokedAsync,
    }),
    home.logout
  );
};
