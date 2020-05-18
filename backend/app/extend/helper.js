'use strict';

const crypto = require('crypto'); // 加密使用
const qs = require('querystring');

// 辅助方法
module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },

  // 使用简单的md5加密用户密码
  encryptPwd(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  },

  stringify(obj) {
    return qs.stringify(obj);
  },
};
