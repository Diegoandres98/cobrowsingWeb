import axiosInstance from './axiosInterceptor';

export const listRoutes = async ({ id_collector }) => {
  const data = {
    collector_id: id_collector
  };

  try {
    const res = await axiosInstance.get(`/route`, {
      data: data
    });

    console.log('1.. ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors...... ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};
