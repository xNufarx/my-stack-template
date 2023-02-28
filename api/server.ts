import 'dotenv/config'
import express from 'express'
import { connectDb } from './repositories/db'
import { UserModel } from './models/UserModel'

const PORT = process.env.SERVER_PORT || 8080

const app = express()

connectDb()
  .then(() => {
    if (!UserModel.findOne({ name: 'Admin' })) {
      UserModel.create({ name: 'Admin' })
    }

    app.use(express.static('public'))

    app.listen(PORT, () =>
      console.log(`✅ App running on http://localhost:${PORT}`)
    )
  })
  .catch(err => console.log(err))

app.get('/api/status', (req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok'
  })
})

app.get('/api/users', async (req, res) => {
  const users: any[] = await UserModel.find()
  res.json(users)
})
