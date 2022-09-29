import axios from 'axios';

const serverIp = process.env.REACT_APP_API_URL + "/customer";

// customer 전체 리스트 받아오기.
const getAllCustomerApi = async() => {
    const res = await axios.get(serverIp);
    return res.data;
}

export {
    getAllCustomerApi
}