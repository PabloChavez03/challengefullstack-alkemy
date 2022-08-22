const app = require('./src/app')
const { conn } = require('./src/db')

const createTypes = require('./src/utils/createTypes')
// const createResultant = require('./src/utils/createResultant')

const {
  PORT
} = process.env

conn.sync({ force: true })
  .then(() => {
    app.listen(PORT, async () => {
      await createTypes()
      // await createResultant()
      console.log('Server connected in', PORT)
    })
  })
