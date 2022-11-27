import axios from 'axios';

const serverIp = process.env.REACT_APP_API_URL + "/board";

// freeBoard 글쓰기.
const postBoard = async(table, data) => {
    const res = await axios.post(serverIp + "/write", {
        params: {
            table: table
        },
        data
    });
    return res.data;
}


// freeBoard 전체 리스트 받아오기.
const getListBoard = async(table, page, limit) => {
    const res = await axios.get(serverIp + "/list", {
        params: {
            table: table,
            page: page === null ? 1 : page,
            limit: limit === null ? 15 : limit
        },
    });
    return res.data; // 최신화 위해 역순으로 정렬.
}

// freeBoard 글 조회.
const getViewBoard = async(table, page, no) => {
    const res = await axios.get(serverIp + "/view", {
        params: {
            table: table,
            page: page,
            no: no
        }
    });
    return res.data;
}


// freeBoard 글 수정.
const putBoard = async(table, page, no, boardData) => {
    const res = await axios.put(serverIp + "/write", {
        params: {
            table: table,
            page: page,
            no: no
        },
        boardData
    });
    return res.data;
}

// freeBoard 글 삭제.
const deleteFreeBoard = async(table, page, no) => {
    const res = await axios.delete(serverIp + "/view", {
        params: {
            table: table,
            page: page,
            no: no
        },
    });
    return res.data;
}

export { getListBoard, postBoard, putBoard, deleteFreeBoard
    , getViewBoard 
};