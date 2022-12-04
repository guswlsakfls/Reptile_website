import { useState } from "react"
import styled from "styled-components";
import moment from "moment";
import { postComment } from "../../Components/Container/getCommentApi";

export default function CommentBox({
    table, no, id, pId, nickname,handleGetCommentList,
    commentCount, setCommentPage, commentLimit,
    setSelectedCommentIndex }) {
    
    const [comment, setComment] = useState("");
    
    
    console.log(pId);
    console.log(nickname);
    
    
    const handleSubmit = () => {

        if (comment === "") {
            alert("댓글을 입력해주세요.");
            return;
        }

        let commentData = {
            b_id: no,
            p_id: id,
            m_id: 1,
            hit: 0,
            text: comment
        }

        if (pId !== null) {
            commentData = {
                ...commentData,
                p_id: pId
            }
        }

        // 수정이 아니면
        if (true) {
            commentData = {
                ...commentData,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        }

        // 대댓글에 댓글이면
        if (nickname !== undefined) {
            commentData = {
                ...commentData,
                nick_tag: nickname,
            }
        }

        console.log(commentData);

        // if (no) {
        //     putBoard(table, page, no, commentData)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err));
        //     navigate(`/board/view?table=${table}&page=${page}&no=${no}`);
        // }
        // else {
            postComment(table, no, commentData)
            .then(res => {
                console.log(res)
                setSelectedCommentIndex(null);
                handleGetCommentList(true);
                setCommentPage(Math.ceil(commentCount / commentLimit));
                setComment("");
            })
            .catch(err => console.log(err));
        // }
    }

    const changeComment = (e) => {
        setComment(e.target.value);
    }

    return(
        <>
            <Container>
                <Textarea value={comment} onChange={changeComment} placeholder="댓글을 작성해주세요" maxLength={1000}></Textarea>
                <Button onClick={handleSubmit}>등록</Button>
            </Container>
            <br></br>
        </>
    )
}

const Textarea = styled.textarea`
    width: 100%;
    height: 60px;
    resize: none;
    border: none;
    padding: 10px;
    font-size: 14px;
    outline: none;
`

const Container = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    background: #fff;
`

const Button = styled.button`
    width: 90px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background: gray;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        background: #333;
    }
`