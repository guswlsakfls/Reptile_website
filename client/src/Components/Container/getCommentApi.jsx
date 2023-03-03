import axios from 'axios';

const serverIp = process.env.REACT_APP_API_URL + "/comment";

const postComment = async(table, no, commentData) => {
    const res = await axios.post(serverIp + "/write", {
        params: {
            table: table,
            no: no
        },
        commentData
    });
    return res.data;
}

// comment 리스트 조회
const getCommentList = async(table, no, commentPage, commentLimit) => {
    const res = await axios.get(serverIp + "/list", {
        params: {
            table: table,
            no: no,
            commentPage: commentPage === null ? 1 : commentPage,
            commentLimit: commentLimit === null ? 30 : commentLimit
        }
    });
    return res.data;
}

// comment 수정을 위한 조회
const getCommentId = async(table, id) => {
    const res = await axios.get(serverIp + "/view", {
        params: {
            table: table,
            id: id
        }
    });
    return res.data;
}

// comment 수정
const putCommentId = async(table, id, updateComment) => {
    const res = await axios.put(serverIp + "/write", {
        params: {
            table: table,
            id: id
        },
        comment: updateComment
    });
    return res.data;
}

const deleteComment = async(table, no, id, pId) => {
    const res = await axios.delete(serverIp + "/view", {
        params: {
            table: table,
            no: no,
            id: id,
            p_id: pId,
        }
    });
    return res.data;
}

export { getCommentList, postComment, getCommentId, putCommentId, deleteComment };