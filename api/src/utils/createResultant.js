const { Resultant } = require('../db.js')

const createResultant = async () => {
  const countTypes = await Resultant.findAndCountAll()

  if (countTypes.count === 1) return

  try {
    const result = await Promise.resolve(
      await Resultant.create({ money: 0 })
    ).catch((e) => new Error(e))

    return result
  } catch (error) {
    console.log(error)
    return new TypeError(error)
  }
}

module.exports = createResultant
