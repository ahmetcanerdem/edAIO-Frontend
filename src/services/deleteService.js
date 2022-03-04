import axios from 'axios';

const deleteService = (url, id) => {
  return axios.delete(`${url}/${id}`);
};

export default deleteService;