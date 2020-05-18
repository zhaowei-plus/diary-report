'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    this.ctx.body = this.ctx.service.home.index();
  }

  async findHot() {
    this.ctx.body = this.ctx.service.home.findHot();
  }

  async findHeart() {
    this.ctx.body = this.ctx.service.home.findHeart();
  }

  async login() {
    const { ctx, app, config } = this;
    const { service, helper } = ctx;
    const { username, password } = ctx.request.body;

    const user = await service.user.findByName(username);
    if (!user) {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: '用戶名不存在',
      };
    } else {
      if (user.password === helper.encryptPwd(password)) {
        ctx.status = 200;
        const token = app.jwt.sign(
          {
            id: user._id,
            name: user.name,
          },
          config.jwt.secret,
          {
            expiresIn: '1h',
          }
        );

        try {
          await app.redis.set(`token_${user._id}`, token);
          ctx.body = {
            success: true,
            data: token,
            message: '获取Token成功',
          };
        } catch (e) {
          console.error(e);
          ctx.body = {
            success: false,
            message: '服务繁忙，请稍后重试',
          };
        }
      } else {
        ctx.status = 403;
        ctx.body = {
          success: false,
          message: '密码错误',
        };
      }
    }
  }

  async userInfo() {
    const { ctx } = this;

    /*
     * egg-jwt插件，在鉴权通过的路由对应的controller函数中，会将app.jwt.sign(user, secrete)加密的用户信息，添加到ctx.state.user中，
     * 这里userInfo函数只需要将它返回即可
     * */
    const { user } = ctx.state;
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '登出成功',
    };
  }

}

module.exports = HomeController;
