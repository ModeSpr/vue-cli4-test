/**
 * Created by dm.
 */

/**
 * 验证，通过：false，未通过：msg
 * @param {object} volidForm
 * @param {object} rules
 * @returns {boolean | string}
 */
function retuenMsg (key, msg) {
  if (msg) {
    throw new Error(msg) // foreach.break;
  } else {
    throw new Error(key + 'is error')
  }
}
export function volid (volidForm, rules) {
  try {
    Object.keys(rules).forEach(key => {
      if (Object.prototype.toString.call(rules[key]) === '[object Array]') {
        rules[key].forEach(i => {
          if (Object.prototype.hasOwnProperty.call(i, 'required') && !volidForm[key]) {
            retuenMsg(key, i.message)
          }
          if (Object.prototype.hasOwnProperty.call(i, 'maxLength') && volidForm[key].length > i.maxLength) {
            retuenMsg(key, i.message)
          }
          if (Object.prototype.hasOwnProperty.call(i, 'pattern') && !i.pattern.test(volidForm[key])) {
            retuenMsg(key, i.message)
          }
          if (Object.prototype.hasOwnProperty.call(i, 'validator') && !i.validator(volidForm[key])) {
            retuenMsg(key, i.message)
          }
        })
        return false // 通过
      }
      if (Object.prototype.toString.call(rules[key]) === '[object Object]') {
        volid(volidForm[key], rules[key])
      }
    })
  } catch (e) {
    if (e.message === 'foreach is not defined') {
      return false
    } else {
      return e.message
    }
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 用户名校验: 首位字母，6到16位（字母，数字，下划线，减号）
 * @param {string} str
 * @returns {Boolean}
 */
export const regUsername = /^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/
export function validUsername (str) {
  return regUsername.test(str.trim())
}

/**
 * 密码校验: 8到16位（字母，数字），至少1个字母和1个数字
 * @param {string} str
 * @returns {Boolean}
 */
export const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
export function validPassword (str) {
  return regPassword.test(str.trim())
}
/**
 * 密码校验2: 8到16位，至少1个字母，1个数字和1个特殊字符
 * @param {string} str
 * @returns {Boolean}
 */
export const regPassword2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
export function validPassword2 (str) {
  return regPassword2.test(str.trim())
}
/**
 * 密码校验3: 8到16位，至少1个大写字母，1个小写字母，1个数字和1个特殊字符
 * @param {string} str
 * @returns {Boolean}
 */
export const regPassword3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$/
export function validPassword3 (str) {
  return regPassword3.test(str.trim())
}

/**
 * 身份证号校验:
 * @param {string} str
 * @returns {Boolean}
 */
export const regIdCard = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/ // 支持1/2代(15位/18位数字)
export const regIdCard1 = /^[a-zA-Z]\d{6}\([\dA]\)$/ // 香港身份证
export const regIdCard2 = /^[1|5|7]\d{6}[(\d)]{3}$/ // 澳门身份证
export const regIdCard3 = /^[a-zA-Z][0-9]{9}$/ // 台湾身份证
export function validIdCard (str) {
  return regIdCard.test(str.trim()) || regIdCard1.test(str.trim()) || regIdCard2.test(str.trim()) || regIdCard3.test(str.trim())
}

/**
 * 手机号校验: 中国(宽松)
 * @param {string} str
 * @returns {Boolean}
 */
export const regMobilePhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
export function validMobilePhone (str) {
  return regMobilePhone.test(str.trim())
}

/**
 * 银行卡号校验: 15或19位
 * @param {string} str
 * @returns {Boolean}
 */
export const regBank = /^([1-9]{1})(\d{14}|\d{18})$/
export function validBank (str) {
  return regBank.test(str.trim())
}

/**
 * 邮箱校验: 只允许英文字母、数字、下划线、英文句号、以及中划线组成
 * @param {string} str
 * @returns {Boolean}
 */
export const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export function validEmail (str) {
  return regEmail.test(str.trim())
}
/**
 * 邮箱校验2: 名称允许汉字、字母、数字，域名只允许英文域名
 * @param {string} str
 * @returns {Boolean}
 */
export const regEmail2 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export function validEmail2 (str) {
  return regEmail2.test(str.trim())
}
