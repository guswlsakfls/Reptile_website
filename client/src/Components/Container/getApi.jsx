import axios from 'axios';

const serverIp = process.env.REACT_APP_API_URL + "/board";

// freeBoard 전체 리스트 받아오기.
const getAllFreeBoard = async() => {
    const res = await axios.get(serverIp);
    return res.data.reverse(); // 최신화 위해 역순으로 정렬.
}

// freeBoard 글쓰기.
const postFreeBoard = async(data) => {
    const res = await axios.post(serverIp + "/write", data);
    return res.data;
}

// freeBoard 글 수정.
const putFreeBoard = async(data) => {
    const res = await axios.put(serverIp, data);
    return res.data;
}

// freeBoard 글 삭제.
const deleteFreeBoard = async(id) => {
    const res = await axios.delete(serverIp + "/" + id);
    return res.data;
}

export { getAllFreeBoard, postFreeBoard, putFreeBoard, deleteFreeBoard };