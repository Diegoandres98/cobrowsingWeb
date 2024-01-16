import axiosInstance from './axiosInterceptor';

// export const createCollector = async ({ username, password, name }) => {
//   try {
//     const res = await axiosInstance.post('/collector', {
//       username: username,
//       name: name,
//       pass: password
//     });

//     console.log('res ' + JSON.stringify(res));
//     return res.data;
//   } catch (e) {
//     console.log('errors ' + e);
//     throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
//   }
// };

export const listClient = async () => {
  try {
    const res = await axiosInstance.get('/client');

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};

export const putClientStatusInactive = async ({ id, status }) => {
  try {
    const res = await axiosInstance.put('/client/' + id, {
      status: !status
    });

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};
