import { useEffect, useState } from "react"
import styled from "styled-components";
import moment from "moment";
import { postComment, getCommentId, putCommentId } from "../../Components/Container/getCommentApi";

export default function CommentBox({
    table, no, id, pId, nickname,handleGetCommentList,
    commentCount, setCommentPage, commentLimit,
    setSelectedCommentIndex, lastComment, isSelectedUpdate,
    setLastComment, setIsSelectedCommentBox, setIsSelectedComment,
    setIsSelectedUpdate }) {

    const [comment, setComment] = useState("");

    const handleSubmit = () => {

        if (lastComment === "") {
            alert("댓글을 입력해주세요.");
            return;
        }

        let commentData = {
            b_id: no,
            p_id: id, // 그냥 대댓글이면
            m_id: 1,
            hit: 0,
            text: lastComment
        }

        // 대댓글에 댓글 이면
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

        // 대댓글에 댓글이면 @표시
        if (nickname !== undefined) {
            commentData = {
                ...commentData,
                nick_tag: nickname,
            }
        }

        console.log(commentData);

        // 댓글 수정이면
        if (isSelectedUpdate === true && id !== null) {
            putCommentId(table, id, lastComment)
            .then(res => {
                handleGetCommentList(false);
                setSelectedCommentIndex();
                setIsSelectedCommentBox(false);
                setIsSelectedUpdate(false);
                console.log(res);
            })
            .catch(err => console.log(err));
        }
        else {
            postComment(table, no, commentData)
            .then(res => {
                // console.log(res)
                if (id !== undefined) {
                    setSelectedCommentIndex(null);
                    setIsSelectedCommentBox(false);
                    setIsSelectedComment(false);
                }
                if (commentData.p_id !== undefined) {
                    handleGetCommentList(false);
                }
                else {
                    handleGetCommentList(true);
                    setCommentPage(Math.ceil(commentCount / commentLimit)); // 댓글이면 마지막 페이지로 이동
                }
                setLastComment("");
            })
            .catch(err => console.log(err));
        }
    }

    const changeComment = (e) => {
        setLastComment(e.target.value);
        // setComment(e.target.value);
    }

    useEffect(() => {
        // setComment(lastComment);
        // setComment(lastComment);
    }, [])

    return(
        <>
            <Container>
                <Textarea value={lastComment} onChange={changeComment} placeholder="댓글을 작성해주세요" maxLength={1000}></Textarea>
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
    font-size: 10px;
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