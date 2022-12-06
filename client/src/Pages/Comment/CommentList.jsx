import { useState } from 'react';
import styled from "styled-components";
import img from "../../Assets/8.jpg";
import { Button } from "../BoardPage/Board.element";
import CommentBox from "./CommentBox"
import { deleteComment, getCommentId } from "../../Components/Container/getCommentApi";

export default function CommentList({
    index, date, text, hit, nickTag, isSelectedReply,
    setSelectedCommentIndex, id, pId, setPid,
    table, no, setCommentPage,
    commentCount, commentLimit, handleGetCommentList,
    isSelectedModal, setSelectedModalIndex }) {

    const [lastComment, setLastComment] = useState("");
    const [isUpdateSelected, setIsUpdateSelected] = useState(false);

    // const clickGetCommentId = () => {
    //     getCommentId(table, no, id)
    //     .then(res => {
    //         console.log(res);
    //         setLastComment(res.text);
    //     })
    //     .catch(err => console.log(err));
    // };

    const clickReplyBox = () => {
        if (isSelectedReply) {
            setSelectedCommentIndex();
        }
        else {
            setSelectedCommentIndex(index);
        }
        setPid(pId);
    }

    const popUpBox = () => {
        if (isSelectedModal) {
            setSelectedModalIndex();
        }
        else {
            setSelectedModalIndex(index);
        }
    }

    const clickUpdateComment = () => {
        console.log("update");
        if (isUpdateSelected === false) {
            getCommentId(table, id)
            .then(res => {
                console.log(res);
                setLastComment(res.text);
                setSelectedCommentIndex(index);
                setIsUpdateSelected(true);
            })
            .catch(err => console.log(err));
        }
        else {
            setIsUpdateSelected(false);
            setSelectedCommentIndex();
            setLastComment("");
        }
    }

    const clickDeleteComment = () => {
        deleteComment(table, no, id, pId)
        .then(res => {
            console.log(res);
            handleGetCommentList();
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <Container isReply={pId}>
                <Main>
                    {/* 이미지 넣어야함 */}
                    <UserImg src={img}></UserImg>
                    <CommentWrapper>
                        <Info>
                            <Left>
                                {/* 회원정보 불러와 닉네임 */}
                                <div>운영자</div>
                                {/* <div>{comment.nickname}</div> */}
                                <div>{date}</div>
                                <div>{hit}</div>
                            </Left>
                            <Right>
                                <CommentReply onClick={clickReplyBox}>{(isSelectedReply && "닫기") || "댓글"}</CommentReply>
                                <CommentLike>침하하</CommentLike>
                                <CommentPopUp onClick={popUpBox}>
                                    :
                                    {(isSelectedModal &&
                                        <ModalUl>
                                            <ModalLi><Button onClick={clickUpdateComment}>
                                                {isUpdateSelected === false ? "수정" : "x닫기"}</Button></ModalLi>
                                            <ModalLi><Button onClick={clickDeleteComment}>삭제</Button></ModalLi>
                                        </ModalUl>) || ""}
                                </CommentPopUp>
                            </Right>
                        </Info>
                        <NickTag>{nickTag !== null &&`@${nickTag}`}</NickTag>
                        <div>{text}</div>
                        {isSelectedReply &&
                        <CommentBox
                            table={table}
                            no={no}
                            pId={pId}
                            id={id}
                            nickname={"조현진"}
                            setCommentPage={setCommentPage}
                            commentCount={commentCount}
                            handleGetCommentList={handleGetCommentList}
                            commentLimit={commentLimit}
                            setSelectedCommentIndex={setSelectedCommentIndex}
                            lastComment={lastComment}
                            setLastComment={setLastComment}
                            isUpdateSelected={isUpdateSelected}
                        />}
                    </CommentWrapper>
                </Main>
            </Container>
        </>
    )
}

const ModalUl = styled.ul`
    display: flex;
    position: absolute;
    top: 20px;
    padding: 8px;
    right: 0;
    z-index: 1;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
`;

const ModalLi = styled.li`
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 3px;
    margin-left: ${(props) => props.isReply ? "40px" : "0px"};
    `

const Main = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e9ecef;
    `

const CommentWrapper = styled.div`
    width: 100%;
    `

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 0.9em;
    margin-top: 5px;
    margin-bottom: 10px;
    `

const Right = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    /* gap: 10px; */
    `

const Left = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    `

const UserImg = styled.img`
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    margin-right: 3px;
    background-color: #e9ecef;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    `

const CommentReply = styled.button`
    /* height: 30px; */
    font-size: 0.8em;
    color: #222;
    background-color: transparent;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #e9ecef;
    }
    `

const CommentLike = styled.button`
    /* height: 30px; */
    font-size: 0.8em;
    color: #222;
    background-color: transparent;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #e9ecef;
    }
    `

const CommentPopUp = styled.div`
    /* height: 30px; */
    padding: 1px;
    /* font-size: 0.8em; */
    color: #222;
    background-color: transparent;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #e9ecef;
    }
    `

const NickTag = styled.div`
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 5px;
`
