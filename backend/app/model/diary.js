'use strict';

/**
 * 放置领域模型，由领域类插件约定
 * */

const moment = require('moment');

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DiarySchema = new Schema({
    id: {
      type: Number,
      index: true, // 普通索引
    },
    userId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    category: {
      type: Number,
      required: true,
    },
    create_time: {
      type: Date,
    },
    create_period: {
      type: Number,
    },
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  // 定义索引
  DiarySchema.index({ id: 1 })

  // 创建虚拟类型
  // DiarySchema.virtual('item_info').get(function() {
  //   console.log('获取虚拟类型')
  //   return `${this.title}-${this.info}`;
  // })

  // 给document定义一个前置钩子
  DiarySchema.pre('save', function(next) {
    this.create_time = new Date();
    this.create_period = moment().diff(moment(1589767152000), 'week') + 1;
    next();
  });

  // 给document定义一个后置钩子
  DiarySchema.post('save', function(docs) {
    console.log('后置钩子:', docs);
  });

  // 定义静态方法
  // DiarySchema.static('total', function() {
  //   console.log('countDocuments:', this.find({ }).countDocuments())
  //   return this.find({ }).countDocuments();
  // })

  // 定义Schema，并将Schema转换为能够工作的Model，Modal的实例是document，内置有很多实例方法
  // model就对应数据库中Diary这个collection，确保在调用model()之前把所有需要你的东西都加入到schema中
  return mongoose.model('Diary', DiarySchema, 'diary');
};
