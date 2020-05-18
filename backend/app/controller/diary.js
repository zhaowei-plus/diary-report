'use strict';

const { Controller } = require('egg');

class DiaryController extends Controller {
  async list() {
    const { ctx } = this;
    const { title, info, pageIndex, pageSize } = ctx.query

    const data = await ctx.service.diary.list({
      title,
      info,
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
    });

    ctx.body = {
      success: true,
      data,
      msg: '',
    };
  }

  async update() {
    const { ctx } = this;
    const { id, title, info, url } = ctx.request.body;

    const result = await ctx.service.diary.update(id, title, info, url);
    if (result) {
      ctx.body = {
        success: false,
        msg: result,
      };
      return false;
    }

    ctx.body = {
      success: true,
      msg: '',
    };
    return true;
  }

  async detail() {
    const { ctx } = this;
    const { id } = ctx.params;
    console.log('params:', ctx.params);

    ctx.body = await ctx.service.diary.detail(id);
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    ctx.body = await ctx.service.diary.deleteOne({"_id":id})
  }

  async add() {
    await this.ctx.service.diary.add(this.ctx.request.body);
    this.ctx.body = {
      success: true,
      msg: '',
    };
  }

  // 查询每期文章收集
  async getByWeek() {
    const { period } = this.ctx.query;
    const result = await this.ctx.service.diary.getByWeek(period);
    this.ctx.body = {
      success: true,
      data: result,
      msg: '',
    };
  }

  // 查询所有期数列表
  async getByWeeks() {
    const result = await this.ctx.service.diary.getByWeeks();

    // 便利统计每一期的推荐文章松鼠
    const calcArticles = {};
    result.map(item => {
      if (!calcArticles[item.create_period]) {
        calcArticles[item.create_period] = 0;
      }
      calcArticles[item.create_period] ++;
    })

    // 展开返回每期以及每期推荐文章列表书
    const periods = Object.keys(calcArticles).map(key => ({
      period: Number(key),
      article: calcArticles[key],
    }))

    this.ctx.body = {
      success: true,
      data: periods,
      msg: '',
    };
  }
}

module.exports = DiaryController;
