'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    return 'Hi, egg';
  }

  findHot() {
    const hotArticle = [
      {
        title: '文章001',
        desc: '这是热门文章001',
      },
      {
        title: '文章002',
        desc: '这是热门文章002',
      },
      {
        title: '文章003',
        desc: '这是热门文章003',
      },
    ];
    return hotArticle;
  }

  findHeart() {
    const heartArticle = [
      {
        title: 'Title 0001',
        desc: 'This is heart article 0001',
      },
      {
        title: 'Title 0002',
        desc: 'This is heart article 0002',
      },
    ];
    return heartArticle;
  }
}

module.exports = HomeService;
