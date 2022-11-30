import axios from 'axios';

const serverIp = process.env.REACT_APP_API_URL + "/board";

const postComment = async(table, no, commentData) => {
    const res = await axios.post(serverIp + "/view", {
        params: {
            table: table,
            no: no
        },
        commentData
    });
    return res.data;
}

const getCommentList = async(table, no, commentPage, commentLimit) => {
    const res = await axios.get(serverIp + "/view", {
        params: {
            type: "comment",
            table: table,
            no: no,
            commentPage: commentPage === null ? 1 : commentPage,
            commentLimit: commentLimit === null ? 30 : commentLimit
        }
    });
    return res.data;
}

const putComment = async(table, no, commentPage, commentData) => {
    const res = await axios.put(serverIp + "/view", {
        params: {
            table: table,
            no: no,
            commentPage: commentPage
        },
        commentData
    });
    return res.data;
}

const deleteComment = async(table, no, commentPage) => {
    const res = await axios.delete(serverIp + "/view", {
        params: {
            table: table,
            no: no,
            commentPage: commentPage
        }
    });
    return res.data;
}

export { getCommentList, postComment, putComment, deleteComment };