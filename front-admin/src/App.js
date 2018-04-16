import React from 'react';
import { jsonServerRestClient,simpleRestClient, fetchUtils, Admin, Resource } from 'admin-on-rest';
import authClient from './authClient';

import { RecipeList } from './recipes';
import { IngredientList } from './ingredients';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const restClient = jsonServerRestClient('http://localhost:8000', httpClient);

const App = () => (
    <Admin restClient={restClient} authClient={authClient}>
      <Resource name="recipes" list={RecipeList} />
      <Resource name="ingredients" list={IngredientList} />
    </Admin>
);

export default App;