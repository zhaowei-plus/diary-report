'use strict';

const mongoose = require('mongoose');
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用服务层
    const { title, content } = await ctx.service.user.user();
    ctx.body = {
      title,
      content,
    };
  }

  async getid() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = `获取数据：${id}`;
  }

  async test() {
    const { ctx } = this;

    /** 测试mongodb数据库 */
    mongoose.connect('mongodb://127.0.0.1:27017/MongoDB');
    const con = mongoose.connection;

    con.on('error', () => {
      ctx.body = '连接数据库失败';
    });

    con.once('open', () => {
      ctx.body = '连接成功';
    });
  }

  async add() {
    const { ctx } = this;
    const { userName } = ctx.request.body;
    console.log('userName:', userName);
    // ctx.body = {
    //   userName,
    // };
    ctx.body = ctx.service.user.add(userName);
  }

  async register() {
    const { userName, password } = this.ctx.request.body;
    console.log('register:', this.ctx.request.body);
    if (!userName) {
      this.ctx.body = {
        success: false,
        msg: '用户名不能为空',
      };
    } else if (!password) {
      this.ctx.body = {
        success: false,
        msg: '密码不能为空',
      };
    } else {
      const user = await this.ctx.service.user.findOne(userName);
      console.log('user:', user);
      if (user) {
        this.ctx.body = {
          success: false,
          msg: '用户已存在',
        };
      } else {
        const user = await this.ctx.service.user.register({ userName, password });
        console.log('user:', user);
        this.ctx.body = {
          success: true,
          msg: '',
          data: {
            userId: user._id,
          },
        };
      }
    }
  }

  async login() {
    const { userName, password } = this.ctx.request.body;
    const user = await this.ctx.service.user.login(userName);
    console.log('--login:', user);

    if (!user) {
      this.ctx.body = {
        success: false,
        msg: '用户名不存在',
      };
    } else if (user.password !== password) {
      this.ctx.body = {
        success: false,
        msg: '密码错误',
      };
    } else {
      this.ctx.body = {
        success: true,
        msg: '',
        data: {
          userId: user._id,
        },
      };
    }
  }
}

module.exports = UserController;
