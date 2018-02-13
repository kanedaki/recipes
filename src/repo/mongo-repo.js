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
  console.log('wtf', name)
  const i = await db.collection('ingredients').find({ name }).toArray()
  console.log('ingredient;', i)
  return i
}
