import axiosInstance from './axiosInterceptor';

export const createClient = async ({ name, document, address, occupation }) => {
  try {
    const res = await axiosInstance.post('/client', {
      name: name,
      document: document,
      address: address,
      occupation: occupation
    });

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};

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
