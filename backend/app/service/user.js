'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async add(userName) {
    const { ctx } = this;

    return await ctx.model.User.create({
      userName,
    });
  }

  async login(userName) {
    return this.ctx.model.User.findOne({ userName });
  }

  async register({ userName, password }) {
    return this.ctx.model.User.create({
      userName,
      password,
    });
  }

  async findOne(userName) {
    return this.ctx.model.User.findOne({ userName });
  }
}

module.exports = UserService;
