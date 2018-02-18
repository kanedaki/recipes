import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import config from '../config.json'
import routes from './routes'
import { connectToDB } from './repo/mongo-repo'
import serviceFactory from './services'

const port = process.env.port || 8000

async function main() {
  const app = express()
  app.set('supersecret', config.secret)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(jwt({ secret: app.get('supersecret') }).unless({ path: ['/register', '/login'] }))

  const db = await connectToDB()
  const services = serviceFactory(app, db)
  routes(app, db, services)
  app.listen(port, () => {
    console.log(`We are live on ${port}`)
  })
}

main()
