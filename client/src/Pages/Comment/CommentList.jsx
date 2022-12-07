import { useState, useRef, useEffect, useCallback } from 'react';
import styled from "styled-components";
import img from "../../Assets/8.jpg";
import { Button } from "../BoardPage/Board.element";
import CommentBox from "./CommentBox"
import { deleteComment, getCommentId } from "../../Components/Container/getCommentApi";

export default function CommentList({
    index, date, text, hit, nickTag,
    setSelectedCommentIndex, id, pId, setPid,
    table, no, setCommentPage,
    commentCount, commentLimit, handleGetCommentList,
    isSelectedModal, setSelectedModalIndex}) {

    // isSelectedCommentBox,

    const [lastComment, setLastComment] = useState("");
    const [isSelectedComment, setIsSelectedComment] = useState(false);
    const [isSelectedUpdate, setIsSelectedUpdate] = useState(false);
    const [isSelectedCommentBox, setIsSelectedCommentBox] = useState(false);
    const [selectedRef, setSelectedRef] = useState(false);
    const modalRef = useRef();

    // const clickGetCommentId = () => {
    //     getCommentId(table, no, id)
    //     .then(res => {
    //         console.log(res);
    //         setLastComment(res.text);
    //     })
    //     .catch(err => console.log(err));
    // };

    const clickReplyBox = () => {
        if (isSelectedUpdate === true && isSelectedCommentBox === true) {
            setIsSelectedUpdate(false);
            setIsSelectedComment(true);
            setLastComment("");
        }
        // 박스가 열려있으면 닫기
        else if (isSelectedCommentBox === true) {
            setIsSelectedComment(false);
            setSelectedCommentIndex();
            setIsSelectedCommentBox(false);
        }
        // 박스가 닫혀있으면 열기
        else {
            setLastComment("");
            setIsSelectedComment(true);
            setSelectedCommentIndex(index);
            setIsSelectedCommentBox(true);
        }
        setPid(pId);
    }

    
    const clickUpdateComment = () => {
        console.log("update");
        // setIsSelectedComment(false);
        setIsSelectedComment(false);
        if (isSelectedUpdate === false) {
            getCommentId(table, id)
            .then(res => {
                console.log(res);
                setLastComment(res.text);
                setSelectedCommentIndex(index);
                setIsSelectedCommentBox(true);
                setIsSelectedUpdate(true);
            })
            .catch(err => console.log(err));
        }
        else {
            setIsSelectedUpdate(false);
            setSelectedCommentIndex();
            setIsSelectedCommentBox(false);
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

    const popUpBox = () => {
        console.log(isSelectedModal)
        // console.log(selectedRef)
        // if (isSelectedModal === true) {
        if (isSelectedModal) {
            setSelectedModalIndex();
            // setSelectedRef(false);
        }
        else {
            setSelectedModalIndex(index);
            // setSelectedRef(true);
        }
    }
    
    // focus out 되면 모달창 닫기
    useEffect(() => {
        document.addEventListener("mouseup", onClickOutside);
        return () => {
            document.removeEventListener("mouseup", onClickOutside);
        };
    }, [])
    
    const onClickOutside = useCallback(({ target }) => {
        // 태그가 모달창이 아니면
        if (modalRef.current && !modalRef.current.contains(target)) {
            // setSelectedRef(true);
            if (target.className.includes("modalLi") === false) {
                setSelectedModalIndex();
            }
            console.log(modalRef.current)
            console.log(target.className.includes("modalLi"))
        }
        // setSelectedRef(false);
    }, []);
    
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
                                <CommentReply onClick={clickReplyBox}>{(isSelectedComment && "닫기") || "댓글"}</CommentReply>
                                <CommentLike>침하하</CommentLike>
                                {/* <CommentPopUp onClick={isSelectedUpdate === false ? popUpBox : undefined}> */}
                                <CommentPopUp className="modalLi" onClick={popUpBox}>
                                    :
                                    {(isSelectedModal &&
                                        <ModalUl ref={modalRef}>
                                            <ModalLi ><Button onClick={clickUpdateComment}>
                                                {isSelectedUpdate === false ? "수정" : "x닫기"}</Button></ModalLi>
                                            <ModalLi><Button onClick={clickDeleteComment}>삭제</Button></ModalLi>
                                        </ModalUl>) || ""}
                                </CommentPopUp>
                            </Right>
                        </Info>
                        <NickTag>{nickTag !== null &&`@${nickTag}`}</NickTag>
                        <div>{text}</div>
                        {isSelectedCommentBox &&
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
                                isSelectedUpdate={isSelectedUpdate}
                                setIsSelectedCommentBox={setIsSelectedCommentBox}
                                setIsSelectedComment={setIsSelectedComment}
                                setIsSelectedUpdate={setIsSelectedUpdate}
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
