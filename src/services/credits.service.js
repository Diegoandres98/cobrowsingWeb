import axiosInstance from './axiosInterceptor';

export const listCredit = async (page = 1, itemsForPage = 10, id_collector = 1) => {

try {
    const res = await axiosInstance.get(`/credit/bycollector/${id_collector}?pagina=${page}&itemsForPage=${itemsForPage}`);

    console.log('res ' + JSON.stringify(res));
    return res.data;
  } catch (e) {
    console.log('errors ' + e);
    throw 'Error de inicio de sesión: ' + (e.response?.data || e.message);
  }
};
