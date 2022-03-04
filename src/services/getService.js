import axios from 'axios';

const getService = (initialUrl, data) => {
    let url = initialUrl;
    if (data) {
        const params = new URLSearchParams(data).toString();
        url = `${url}?${params}`
    }
    return axios.get(url).then((res) => {
        return res?.data ? res.data : []
    }).catch(err => { return err })
};

export default getService;