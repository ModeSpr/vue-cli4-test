/**
 * 常用函数
 */

/**
 * 生成随机ID
 * @param {Number} len 长度
 * @returns {String}
 * @example randomID(10) // "jg7zpgiqva"
 * */
export const randomID = (len) => Math.random().toString(36).substr(3, len)

/**
 * 取整 代替正数的Math.floor()，代替负数的Math.ceil()
 *  num | 0
 *  num >> 0
 * @param {Number} num
 * @example ceil(1.2) // 1
 * @example ceil(-1.2) // -1
 */
export const ceil = (num) => ~~num


/**
 * 补零
 * @param {Number} num
 * @param {Number} len
 * @example zerofill(12, 3) // 012
 */

export const zerofill = (num, len) => num.toString().padStart(len, '0')

/**
 * 精确小数
 * @param {Number} num 
 * @param {Number} decimal 
 * @example roundNum(1.69, 1) // 1.7
 */
export const roundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal

/**
 * 生成范围随机数
 * @param {Number} min 
 * @param {Number} max 
 */
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * 判断数据类型
 * 可判断类型：undefined、null、string、number、boolean、array、object、symbol、
 * date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 * @param {*} tgt 
 * @param {*} type 
 * @example  
 * DataType(true); // "boolean"
 * DataType([], "array"); // true
 */
export function DataType(tgt, type) {
  const dataType = Object.prototype.toString.call(tgt).replace(/\[object (\w+)\]/, "$1").toLowerCase();
  return type ? dataType === type : dataType;
}

