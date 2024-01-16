import axios from 'axios';

export const Login = async ({ username, password }) => {
  try {
    const res = await axios.post('http://localhost:3000/login-ad', {
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
