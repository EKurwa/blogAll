import * as crypto from 'crypto';
/**
 * md5加密
 * @param {string} str 加密明文
 * @returns {string} 加密后的密文
 */
export default function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
