import axios from 'axios';
import { message } from 'antd';

const postService = async (url, data) => {
    const result = await axios.post(url, data);
    if (result.status == 200) {
        message.success("Successful Saved.")
    }
    return result?.data;
};

export default postService;