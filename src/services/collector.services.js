import axiosInstance from './axiosInterceptor';

export const createCollector = async ({ username, password, name }) => {
  try {
    const res = await axiosInstance.post('/collector', {
      username: username,
      name: name,
      pass: password
    });

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};

export const listCollector = async () => {
  try {
    const res = await axiosInstance.get('/collector');

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};

export const putCollectorStatusInactive = async ({ id, status }) => {
  try {
    const res = await axiosInstance.put('/collector/' + id, {
      status: !status
    });

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};

export const putCollector = async ({ id, username, name, pass }) => {
  try {
    const res = await axiosInstance.put('/collector/' + id, {
      username,
      name,
      pass
    });

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};