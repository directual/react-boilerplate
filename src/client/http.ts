/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _get from 'lodash/get';
import { api } from 'directual';


export const getLocale = () => axios.get('http://localhost:3001/locale');

export function authenticateUser(data: { username: string, password: string }) {
  return axios.post('/auth', data).then(response => response.data);
}

export function getGoogleClientId() {
  return axios.get('/getGoogleClientId').then(response => response.data);
}

export function authWithGoogle(credentials: any) {
  return axios.post('/auth/google', credentials).then(response => response.data)
    .catch(err => console.error(err));
}

export function getUser(username: string) {
  return api
    .structure('WebUser')
    .search({ filters: [{ field: 'id', value: username, exp: '==' }] })
    .then(response => _get(response, 'result.list[0].obj', {}));
}

// https://directual.com/good/api/v5/data/BABAIKAS/getBabaikas?appID=540460cc-4a0a-4f80-a077-f7c647bb4e44&appSecret=bbyINFPgHHs
export function getData() {
  return api
    .structure('BABAIKAS')
    .getData('getBabaikas');
}
