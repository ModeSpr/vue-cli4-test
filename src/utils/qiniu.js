
import { Toast } from 'vant'
import { getUploadSpec } from '@/api/file'
const qiniu = require('qiniu-js')

export function uploadImage ({ file, params, setImage, setPercent, error, direct = false }) {
  const param = {
    action: 'avatar',
    ext: file.name.split('.')[file.name.split('.').length - 1],
    ...params
  }
  const toast = Toast.loading({
    type: 'loading',
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '正在获取上传配置'
  })
  getUploadSpec(param).then(res => {
    if (res.error_code) {
      toast.type = 'fail'
      toast.message = '获取上传配置失败，请重试'
      setTimeout(() => {
        toast.clear() // 清除 Toast
      }, 1500)
      return
    }
    const { name, upToken, domain } = res.data // bucket
    const observer = {
      next (res) {
        console.log('observer next', res)
        const percent = Math.floor(res.total.percent)
        toast.message = `正在上传: ${percent}%`

        if (setPercent) {
          setPercent(percent)
        }
      },
      error (err) {
        console.log('observer error', err)
        toast.type = 'fail'
        toast.message = '上传失败，请重试'

        setTimeout(() => {
          toast.clear() // 清除 Toast
        }, 1500)
        if (error) {
          error(err)
        }
      },
      complete (res) {
        console.log('observer complete', res)
        if (!direct) {
          setTimeout(() => {
            toast.type = 'success'
            toast.message = '上传成功'
            setTimeout(() => {
              toast.clear() // 清除 Toast
            }, 500)
          }, 500)
        }

        if (setImage) {
          const beforeUrl = res.key
          const url = domain + res.key
          if (direct) {
            setImage({ beforeUrl, url, toast })
          } else {
            setImage({ beforeUrl, url })
          }
        }
      }
    }
    const observable = qiniu.upload(file, name, upToken)
    observable.subscribe(observer)
  })
    .catch(error => {
      console.log('getUploadSpec image err: ', error)
      toast.type = 'fail'
      toast.message = '获取上传配置失败，请重试'
      setTimeout(() => {
        toast.clear() // 清除 Toast
      }, 1500)
    })
}
