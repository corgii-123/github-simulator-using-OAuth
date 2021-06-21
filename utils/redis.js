export default function runRedis() {
  const Redis = require('ioredis') 

  const redis = new Redis({ port: 6378 })

  async function getData(key) {
    let data = {}
    try {
      data = await redis.get(key)
      return JSON.parse(data)
    } catch (err) {
      return data
    }
  }

  async function setData(key, value) {
    let valueStr = ''
    try {
      valueStr = JSON.stringify(value)
      return await redis.set(key, valueStr, "EX", 60 * 100);
    } catch (err) {
      return await redis.set(key, String(value), "EX", 60 * 100);
    }
  }

  async function deleteData(key) {
    return await redis.del(key)
  }

  return {
    getData,
    setData,
    deleteData
  }
}