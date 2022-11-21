import ViewerAPI from "./ViewerAPI";
import { deleteFreeBoard, getViewBoard } from "../../Components/Container/getApi";
import Navbar from "../../Components/Common/Navbar";
import { useState, useEffect } from "react";
import { Body, Container } from "../../Components/Common/Body";
import { LinkButton, Button } from "./Board.element";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ViewBoard() {
    const [boardList, setBoardList] = useState([]);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const table = searchParams.get("table") || null;
    const page = parseInt(searchParams.get("page")) || 1;
    const no = parseInt(searchParams.get("no")) || null;

    useEffect(() => {
        getViewBoard(table, page, no)
        .then(res => {setBoardList(res);})
        .catch(err => console.log(err));
    }, [])

    const deletePage = () => {
        deleteFreeBoard(table, page, no)
        .then(res => {
            console.log(res);
            navigate(`/board/list?table=${table}&page=1`);
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
                        <ViewerAPI value={boardList.text}/>
                        <LinkButton to={`/board/list?table=${table}&page=${page}`}>되돌아가기</LinkButton>
                        <LinkButton to={`/board/write?table=${table}&page=${page}&no=${no}`}>수정하기</LinkButton>
                        <Button onClick={deletePage}>삭제하기</Button>
                    </Container>
                </Body>
        </>
    )
}