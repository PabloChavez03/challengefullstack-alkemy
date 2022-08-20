const { Type } = require('../db.js')

const createTypes = async () => {
  const countTypes = await Type.findAndCountAll()

  if (countTypes.count === 2) return

  try {
    const types = await Promise.all([
      await Type.create({ name: 'ingress' }),
      await Type.create({ name: 'egress' })
    ]).catch((e) => new Error(e))

    return types
  } catch (error) {
    console.log(error)
    return new TypeError(error)
  }
}

module.exports = createTypes
