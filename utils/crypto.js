const { createHmac } = require('crypto')

const cryptoBaseNode = (msg: string | Blob) => {
  return new Promise((resolve, reject) => {
    // 根据实际情况选择对应的加密算法和加密的密钥
    // sha256 - 加密算法
    // jzy - 加密密钥
    const hmac = createHmac('sha256', 'jzy')

    hmac.on('readable', () => {
      const data = hmac.read()
      if (data) {
        resolve(data.toString('hex'))
      }
      reject(Error('加密失败'))
    })

    hmac.write(msg)
    hmac.end()
  })
}
