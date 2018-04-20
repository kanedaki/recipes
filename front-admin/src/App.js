import React from 'react';
import { jsonServerRestClient, fetchUtils, Admin, Resource, Delete } from 'admin-on-rest';
import authClient from './authClient';

import { RecipeList, RecipeEdit, RecipeCreate } from './modules/recipes';
import { IngredientList, IngredientEdit } from './modules/ingredients';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }

  const token = localStorage.getItem('token');
  options.user = {
    authenticated: true,
    token: `Bearer ${token}`
  }
  // const token = localStorage.getItem('token');
  // options.headers.set('Authorization', `Bearer ${token}`);
  // options.headers.set('X-Custom-Header', 'foobar')
  return fetchUtils.fetchJson(url, options);
}
const restClient = jsonServerRestClient('http://localhost:8000', httpClient);
//const restClient = jsonServerRestClient('http://jsonplaceholder.typicode.com')

const App = () => (
    <Admin restClient={restClient} authClient={authClient}>
      <Resource name="recipes" list={RecipeList} edit={RecipeEdit} create={RecipeCreate}/>
      <Resource name="ingredients" list={IngredientList} edit={IngredientEdit} remove={Delete} />
    </Admin>
);

export default App;