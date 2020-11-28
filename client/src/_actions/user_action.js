import axios from 'axios';
import { LOGIN_USER } from './types';

export function loginUser(data) {
  const req = axios.post('/api/users/login', data).then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}
