import React from 'react';
import { jsonServerRestClient, fetchUtils, Admin, Resource } from 'admin-on-rest';
import authClient from './authClient';

import { RecipeList, RecipeEdit, RecipeCreate } from './recipes';
import { IngredientList, IngredientEdit } from './ingredients';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const restClient = jsonServerRestClient('http://localhost:8000', httpClient);
//const restClient = jsonServerRestClient('http://jsonplaceholder.typicode.com')

const App = () => (
    <Admin restClient={restClient} authClient={authClient}>
      <Resource name="recipes" list={RecipeList} edit={RecipeEdit} create={RecipeCreate}/>
      <Resource name="ingredients" list={IngredientList} edit={IngredientEdit}/>
    </Admin>
);

export default App;