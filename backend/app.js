'use strict';

const initUser = require('./app/database/user.json');

class AppBookHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 这里只在开发模式下初始化数据库
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      try {
        console.log('本地初始化用户')
        const ctx = this.app.createAnonymousContext();
        await ctx.model.User.create(initUser, error => {
          if (error) {
            console.error('初始化失败：%s', error);
            return false;
          }
          console.success('初始化成功');
        });
      } catch (e) {
        console.error('初始化异常');
        throw new Error(e);
      }
    }
  }
}

module.exports = AppBookHook
