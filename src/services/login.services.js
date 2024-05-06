import axios from 'axios';
import { PathApi } from '../../src/config/config';

export const Login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${PathApi}/login-ad`, {
      username: username,
      pass: password
    });
    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};
