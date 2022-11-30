import { useState } from "react"
import styled from "styled-components";

export default function CommentBox() {
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();    
    }

    const changeComment = (e) => {
        setComment(e.target.value);
    }

    return(
        <>
            <Container>
                    <Textarea value={comment} onChange={changeComment} placeholder="댓글을 작성해주세요" maxLength={200}></Textarea>
                    <Button>등록</Button>
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