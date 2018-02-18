import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createShoppingList } from './businessLogic/shoppingList'

const saltRounds = 10

const routes = (app, db, services) => {
  app.post('/register', async (req, res) => {
    const { username, password, email } = req.body
    const alreadyExists = await db.getUser(username)
    if (alreadyExists) {
      res.send({ error: 'User already exists' })
    } else {
      const hash = await bcrypt.hash(password, saltRounds)
      const response = await db.insertUser(username, hash, email)
      res.send(response)
    }
  })
  app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await db.getUser(username)
    if (!user) {
      res.send({ error: 'User does not exists' })
    } else {
      const equals = await bcrypt.compare(password, user.password)
      if (!equals) {
        res.sendStatus(401)
      } else {
        const token = jwt.sign({}, app.get('supersecret'))
        res.send({ token, ...user })
      }
    }
  })
  app.get('/logout', async (req, res) => {
    res.send('ok')
  })

  app.post('/user/:username/settings', async (req, res) => {
    const { description, template } = req.body
    const user = await db.insertUserSettings(req.params.username, description, template)
    res.send(user)
  })
  app.get('/user/:username/settings', async (req, res) => {
    const user = await db.getUserSettings(req.params.username)
    res.send(user)
  })

  app.post('/menu/:username', async (req, res) => {
    const menu = await services.createMenu(req.params.username, req.template)
    res.send(menu)
  })
  app.post('/list', async (req, res) => {
    const { menu } = req.body
    const list = await createShoppingList(menu)
    res.send(list)
  })

  app.get('/user/:username/menu', async (req, res) => {
    const menu = await db.getUserMenu(req.params.username)
    res.send(menu)
  })
  app.post('/user/:username/menu', async (req, res) => {
    const { menu } = req.body
    const response = await db.insertUserMenu(req.params.username, menu)
    res.send(response)
  })

  app.get('/user/:username/list', async (req, res) => {
    const list = await db.getUserShoppingList(req.params.username)
    res.send(list)
  })
  app.post('/user/:username/list', async (req, res) => {
    const { list } = req.body
    const response = await db.insertUserShoppingList(req.params.username, list)
    res.send(response)
  })

  app.post('/user/:username/historic', async (req, res) => {
    const { template, menu } = req.body
    const response = await services.insertMenuAndNutrientsIntoHistoric(req.params.username, menu, template)
    res.send(response)
  })
}

export default routes
