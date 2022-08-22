const { Operation, Type, Category } = require('../../db')

const getOperations = async (req, res) => {
  const operations = await Operation.findAll({
    include: {
      model: Type,
      attribute: ['name']
    }
  })

  return res.status(200).json(operations)
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

  return res.status(201).json({ message: 'Operación añadida con éxito' })
}

const getBalance = async (req, res) => {
// la idea es hacer el balance de todos los ingresos y egresos de dinero de la aplicacion
}

module.exports = {
  getOperations,
  addOperation,
  getBalance
}
