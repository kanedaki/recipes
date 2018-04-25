import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createShoppingList } from '../businessLogic/shoppingList'

const saltRounds = 10

const api = (app, db, services) => {
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

  app.post('/user/:username', async (req, res) => {
    const { description } = req.body
    const user = await db.updateUser(req.params.username, description)
    res.send(user)
  })
  app.get('/user/:username', async (req, res) => {
    const { template } = await db.getUserSettings(req.params.username)
    res.send({ template })
  })

  app.post('/user/:username/settings', async (req, res) => {
    const { template } = req.body
    const user = await db.insertUserSettings(req.params.username, { template })
    res.send(user)
  })
  app.get('/user/:username/settings', async (req, res) => {
    const { template } = await db.getUserSettings(req.params.username)
    res.send({ template })
  })

  app.post('/menu/:username', async (req, res) => {
    const menu = await services.createMenu(req.params.username, req.template)
    res.send(menu)
  })
  app.post('/list', (req, res) => {
    const { menu } = req.body
    const list = createShoppingList(menu)
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

  app.post('/user/:username/log', async (req, res) => {
    const { template, menu } = req.body
    const response = await services.insertMenuAndNutrientsIntoLog(
      req.params.username, menu, template)
    res.send(response)
  })

  app.post('/recipe', async (req, res) => {
    const { recipe } = req.body
    const response = await db.insertRecipesWithIngredients([recipe])
    res.send(response)
  })

  app.get('/recipes', async (req, res) => {
    const {
      _end,
      _order,
      _sort,
      _start
    } = req.query
    
    // const response = await db.getUserRecipes()
    const numTotalRecipes = await db.getRecipesNum()
    const response = await db.getRecipesWithPagination(_end, _order, _sort, _start)
    res.set('X-Total-Count', numTotalRecipes)
    res.send(response)
  })

  app.get('/recipes/:id', async (req, res) => {
    const response = await db.getRecipeById(req.params.id)
    res.send(response)
  })

  app.put('/recipes/:id', async (req, res) => {
    const response = await db.updateRecipeById(req.params.id, req.body)
    const recipe = await db.getRecipeById(req.params.id)

    for (const ingredient of recipe.ingredients) {
      const existsIngr = await db.getNumIngredientsWithTheName(ingredient.ingredient)
      if (!existsIngr) await db.insertIngredientOnlyWithName(ingredient.ingredient)
    }

    res.send(response)
  })

  app.get('/ingredients', async (req, res) => {
    const {
      _end,
      _order,
      _sort,
      _start
    } = req.query
    const numTotalIngredients = await db.getIngredientsNum()
    const response = await db.getIngredientsWithPagination(_end, _order, _sort, _start)
    res.set('X-Total-Count', numTotalIngredients)
    res.send(response)
  })

  app.get('/ingredients/:id', async (req, res) => {
    const response = await db.getIngredientById(req.params.id)
    res.send(response[0])
  })

  app.put('/ingredients/:id', async (req, res) => {
    const response = await db.updateIngredientById(req.params.id, req.body)
    res.send(response)
  })

  app.delete('/ingredients/:id', async (req, res) => {
    const response = await db.deleteIngredientById(req.params.id)
    res.send(response)
  })
}

export default api
