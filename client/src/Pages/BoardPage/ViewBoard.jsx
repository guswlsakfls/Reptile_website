import ViewerPage from "./ViewerPage";
import { deleteFreeBoard, getFreeBoard } from "../../Components/Container/getApi";
import Navbar from "../../Components/Common/Navbar";
import { useState, useEffect } from "react";
import { Body, Container } from "../../Components/Common/Body";
import { useParams } from "react-router-dom";
import { LinkButton, Button } from "./Board.element";
import { useNavigate } from "react-router-dom";

export default function ViewBoard() {
    const [boardList, setBoardList] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getFreeBoard(id)
        .then(res => {setBoardList(res);})
        .catch(err => console.log(err));
    }, [])

    const deletePage = () => {
        deleteFreeBoard(id)
        .then(res => {
            console.log(res);
            navigate('/board');
        })
        .catch(err => console.log(err));
    }

    return(
        <>
            <Navbar />
                <Body>
                    <Container>
                        <h1>게시글 보기</h1>
                        <hr></hr>
                        <br></br>
                        <ViewerPage value={boardList.text}/>
                        <LinkButton to="/board/">되돌아가기</LinkButton>
                        <LinkButton to={`/board/write/${id}`}>수정하기</LinkButton>
                        <Button onClick={deletePage}>삭제하기</Button>
                    </Container>
                </Body>
        </>
    )
}