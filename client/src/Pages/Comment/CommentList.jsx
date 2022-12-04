import styled from "styled-components";
import img from "../../Assets/8.jpg";
import CommentBox from "./CommentBox"

export default function CommentList({
    index, date, text, hit, isSelected,
    setSelectedCommentIndex, id, pId, setPid,
    table, no, setCommentPage,
    commentCount, commentLimit, handleGetCommentList }) {

    const updateCommentBox = (e) => {
        if (isSelected) {
            setSelectedCommentIndex();
        }
        else {
            setSelectedCommentIndex(index);
        }
        setPid(pId);
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
                                <CommentReply onClick={updateCommentBox}>{(isSelected && "닫기") || "댓글"}</CommentReply>
                                <CommentLike>침하하</CommentLike>
                                <CommentPopUp>:</CommentPopUp>
                            </Right>
                        </Info>
                        <div>{text}</div>
                        {isSelected &&
                        <CommentBox
                            table={table}
                            no={no}
                            pId={pId}
                            id={id}
                            nickname={"침착맨"}
                            setCommentPage={setCommentPage}
                            commentCount={commentCount}
                            handleGetCommentList={handleGetCommentList}
                            commentLimit={commentLimit}
                            setSelectedCommentIndex={setSelectedCommentIndex}
                        />}
                    </CommentWrapper>
                </Main>
            </Container>
        </>
    )
}

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
    height: 33px;
    `

const Right = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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

const CommentPopUp = styled.button`
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
    // {commentReply.filter(isReplyComment).map((reply, index) => (
    //     <Container key={index} margin={"35px"}>
    //         <Main>
    //             {/* 이미지 넣어야함 */}
    //             <UserImg src={img}></UserImg>
    //             <CommentWrapper>
    //                 <Info>
    //                     <Left>
    //                         {/* 회원정보 불러와 닉네임 */}
    //                         <div>운영자</div>
    //                         {/* <div>{comment.nickname}</div> */}
    //                         <div>{reply.date}</div>
    //                     </Left>
    //                     <Right>
    //                         <CommentReply onClick={updateReplyBox}>{(isReplySelected && "닫기") || "댓글"}</CommentReply>
    //                         <CommentLike>침하하</CommentLike>
    //                         <CommentPopUp>:</CommentPopUp>
    //                     </Right>
    //                 </Info>
    //                 <div>{reply.text}</div>
    //                 {isReplySelected &&
    //                 <CommentBox 
    //                     table={table}
    //                     no={no}
    //                     pId={pId}
    //                     setCommentPage={setCommentPage}
    //                     commentCount={commentCount}
    //                     handleGetCommentList={handleGetCommentList}
    //                     commentLimit={commentLimit}
    //                     setSelectedCommentIndex={setSelectedCommentIndex}
    //                 />}
    //             </CommentWrapper>
    //         </Main>
    //     </Container>
    // ))}