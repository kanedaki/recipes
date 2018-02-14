import { MongoClient } from 'mongodb'

let db

function connectToDB() {
  const url = 'mongodb://localhost:27017'
  const dbName = 'recipes'
  db = MongoClient.connect(url)
    .then((client) => {
      console.log('Connected successfully to server')
      return client.db(dbName)
    })
    .catch(err => console.log('Error connecting db', err))
  return db
}

export const getDB = () => {
  if (db) {
    return Promise.resolve(db)
  }
  return connectToDB()
}

export const findIngredient = async (name) => {
  const db = await getDB()
  const ingredients = await db.collection('ingredients').find({ name }).toArray()
  return ingredients[0]
}

export const findIngredientById = async (_id) => {
  const db = await getDB()
  const ingredients = await db.collection('ingredients').find({ _id }).toArray()
  return ingredients[0]
}

export const findRecipeByName = async (name) => {
  const db = await getDB()
  const recipes = await db.collection('recipes').find({ name }).toArray()
  return recipes[0]
}

export const getUserRecipes = async () => {
  const db = await getDB()
  return db.collection('recipes').find({}).toArray()
}

