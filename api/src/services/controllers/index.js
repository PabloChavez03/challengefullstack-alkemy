const sequelize = require('sequelize')
const { Operation, Type, Category, Resultant } = require('../../db')

const getOperations = async (req, res) => {
  const operations = await Operation.findAll({
    include: {
      model: Type,
      attribute: ['name']
    }
  })

  return res.status(200).json(operations)
}

const getResultant = async (req, res) => {
  const result = await Resultant.findAll({
    include: {
      model: Operation,
      attribute: ['TypeName']
    }
  })

  return res.status(200).json(result)
}

const addOperation = async (req, res) => {
  const { concept, amount, date, type, category } = req.body

  const newOperation = await Operation.create({ concept, amount, date })

  const typeOperation = await Type.findOne({
    where: {
      name: type
    }
  })

  await newOperation.setType(typeOperation)

  if (category && category.length !== 0) {
    const [categoryOperation] = await Category.findOrCreate({
      where: {
        name: category
      }
    })

    await newOperation.setCategory(categoryOperation)
  }

  const result = await Resultant.findOne({ where: { money: 0 } })
  await result.addOperation(newOperation)

  if (typeOperation.name === 'ingress') {
    await result.update({ money: [sequelize.fn('sum', this.money, amount)] })
  }

  return res.status(201).json({ message: 'Operación añadida con éxito' })
}

module.exports = {
  getOperations,
  getResultant,
  addOperation
}
