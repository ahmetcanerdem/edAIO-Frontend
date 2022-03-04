import axios from 'axios'
import { message } from 'antd';

const putService = async (url, data) => {
    const result = await axios.put(url, data);
    if (result.status == 200) {
        message.success("Successful Saved.")
    }
    return result;
};

export default putService;