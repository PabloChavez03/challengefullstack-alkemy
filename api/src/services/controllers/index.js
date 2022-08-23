const sequelize = require('sequelize')
const { Operation, Type, Category } = require('../../db')

const getOperations = async (req, res) => {
  const operations = await Operation.findAll({
    include: {
      model: Type,
      attribute: ['name']
    }
  })

  const newOperations = operations.map((op) => {
    return {
      id: op.id,
      concept: op.concept,
      amount: op.amount,
      date: op.date,
      type: op.TypeName,
      category: op.CategoryName
    }
  })

  return res.status(200).json(newOperations)
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
  const ingresos = await Operation.findAll({
    where: {
      TypeName: 'ingress'
    },
    attributes: [
      'TypeName',
      [sequelize.fn('SUM', sequelize.col('Operation.amount')), 'total_ingress']
    ],
    group: ['TypeName'],
    raw: true
  })

  const egresos = await Operation.findAll({
    where: {
      TypeName: 'egress'
    },
    attributes: [
      'TypeName',
      [sequelize.fn('SUM', sequelize.col('Operation.amount')), 'total_egress']
    ],
    group: ['TypeName'],
    raw: true
  })

  if (!egresos.length && ingresos.length) {
    return res.status(200).json({ balance_total: ingresos[0].total_ingress })
  }
  if (!ingresos.length && egresos.length) {
    return res.status(200).json({ balance_total: -egresos[0].total_egress })
  }

  if (ingresos.length && egresos.length) {
    return res.status(200).json({ balance_total: ingresos[0].total_ingress - egresos[0].total_egress })
  }
}

const updateOperation = async (req, res) => {
  const { id } = req.params
  const { concept, amount, date, category } = req.body

  if (id) {
    try {
      const operationForUpdate = await Operation.findOne({ where: { id } })

      if (category) {
        const [categoryForUpdate] = await Category.findOrCreate({
          where: {
            name: category
          }
        })
        await operationForUpdate.update({ concept, amount, date })
        await operationForUpdate.setCategory(categoryForUpdate)
        await operationForUpdate.save()
      }

      await operationForUpdate.update({ concept, amount, date })
      await operationForUpdate.save()
      return res.status(200).json({ message: 'Los campos fueron actualizados correctamente' })
    } catch (error) {
      return res.status(409).json({ message: `Ocurrio el siguiente error: ${error.message}` })
    }
  }

  return res.status(404).json({ message: 'No existe el id' })
}

const deleteOperation = async (req, res) => {
  const { id } = req.params

  if (id) {
    try {
      const deletedOperation = await Operation.destroy({
        where: {
          id
        }
      })

      if (deletedOperation === 1) {
        return res.status(200).json({ message: 'Se ha eliminado correctamente la operacion' })
      }

      return res.status(404).json({ message: 'Ya se ha eliminado esta operacion' })
    } catch (error) {
      return res.status(409).json({ message: `Ocurrio el siguiente error: ${error.message}` })
    }
  }
}

module.exports = {
  addOperation,
  deleteOperation,
  getBalance,
  getOperations,
  updateOperation
}
