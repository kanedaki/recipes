import { stringify } from 'query-string'
import { fetchUtils } from 'admin-on-rest'

import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from './types'

/**
 * Maps admin-on-rest queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/recipes?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/recipes/123
 * GET_MANY     => GET http://my.api.url/recipes/123, GET http://my.api.url/recipes/456, GET http://my.api.url/recipes/789
 * UPDATE       => PUT http://my.api.url/recipes/123
 * CREATE       => POST http://my.api.url/recipes/123
 * DELETE       => DELETE http://my.api.url/recipes/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'recipes'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = ''
    const options = {}
    console.log('REST->HTTP: ', type)
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          _sort: field === 'id' ? '_id' : field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
        }
        url = `${apiUrl}/${resource}?${stringify(query)}`
        break
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`
        break
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          [params.target]: params.id,
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
        }
        url = `${apiUrl}/${resource}?${stringify(query)}`
        break
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = 'PUT'
        delete params.data.id
        delete params.data._id
        delete params.data.new_ingredient_qty
        delete params.data.ingredient_name
        options.body = JSON.stringify(params.data)
        break
      case CREATE:
        url = `${apiUrl}/${resource}`
        options.method = 'POST'
        delete params.data.new_ingredient_qty
        delete params.data.ingredient_name
        options.body = JSON.stringify(params.data)
        break
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = 'DELETE'
        break
      default:
        throw new Error(`Unsupported fetch action type ${type}`)
    }
    return { url, options }
  }

  /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'recipes'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response
    const newResponseJSON = []
    if (Array.isArray(json)) json.forEach((el, i) => newResponseJSON.push({ id: el._id, ...el }))
    else newResponseJSON.push({ id: json._id, ...json })

    console.log('HTTP->REST: ', type, 'response: ', newResponseJSON)
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has('X-Total-Count')) {
          throw new Error(
            'The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
          )
        }

        return {
          data: newResponseJSON,
          total: parseInt(
            headers
              .get('X-Total-Count')
              .split('/')
              .pop(),
            10
          ),
        }
      case GET_ONE:
      case UPDATE:
      case CREATE:
        return { data: newResponseJSON[0] }
      default:
        return newResponseJSON.length === 1 ? { data: newResponseJSON } : { data: newResponseJSON[0] }
    }
  }

  /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "recipes"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
  return (type, resource, params) => {
    // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
    if (type === GET_MANY) {
      return Promise.all(
        params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
      ).then(responses => ({
        data: responses.map(response => response.json),
      }))
    }
    const { url, options } = convertRESTRequestToHTTP(
      type,
      resource,
      params
    )
    return httpClient(url, options).then(response =>
      convertHTTPResponseToREST(response, type, resource, params)
    )
  }
}
