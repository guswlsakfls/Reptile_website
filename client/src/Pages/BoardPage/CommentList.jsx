import styled from "styled-components";
import img from "../../Assets/8.jpg";

export default function CommentList({ commentList }) {

    return (
        <>
            {commentList.map((comment) => (
                <Container key={comment.id}>
                    <Main>
                        {/* 이미지 넣어야함 */}
                        <UserImg src={img}></UserImg>
                        <CommentWrapper>
                            <Info>
                                <Left>
                                    {/* 회원정보 불러와 닉네임 */}
                                    <div>운영자</div>
                                    {/* <div>{comment.nickname}</div> */}
                                    <div>{comment.date}</div>
                                </Left>
                                <Right>
                                    <CommentReply>댓글</CommentReply>
                                    <CommentLike>침하하</CommentLike>
                                    <span>:</span>
                                </Right>
                            </Info>
                            <div>{comment.text}</div>
                        </CommentWrapper>
                    </Main>
                </Container>
            ))}
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 3px;
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
    gap: 10px;
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

const CommentReply = styled.div`
    /* height: 30px; */
    font-size: 0.8em;
    color: #222;
    background-color: transparent;
    border: 0;
    border-radius: 6px;
`

const CommentLike = styled.div`
    /* height: 30px; */
    font-size: 0.8em;
    color: #222;
    background-color: transparent;
    border: 0;
    border-radius: 6px;
`