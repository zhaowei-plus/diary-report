'use strict';

const Service = require('egg').Service;

class DiaryService extends Service {
  // async add(params) {
  //   const {
  //     userId,
  //     url,
  //     title,
  //     desc,
  //   } = params;
  //
  //   return await ctx.model.Diary.create({
  //     userId,
  //     url,
  //     title,
  //     desc,
  //   });
  // }

  async list(params = {}) {
    const { Diary } = this.ctx.model;

    const {
      title,
      info,
      pageIndex,
      pageSize,
    } = params

    const start = (pageIndex - 1) * pageSize;

    // 多条件查询，每个字段模糊查询
    const query = {
      title: new RegExp(title, 'i'),
      info: new RegExp(info, 'i'),
    }

    const total = await Diary.find(query).countDocuments();
    const list = await Diary.find(query).skip(start).limit(pageSize).exec();

    return {
      list,
      total,
    };
  }

  async add(query) {
    console.log('create:', query)
    return this.ctx.model.Diary.create(query);
  }

  async getByWeek(create_period) {
    return this.ctx.model.Diary.find({ create_period });
  }

  async getByWeeks() {
    return this.ctx.model.Diary.find().sort({ create_period: 1 });
  }

}

module.exports = DiaryService;
