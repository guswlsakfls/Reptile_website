import ViewerAPI from "./ViewerAPI";
import { deleteFreeBoard, getViewBoard } from "../../Components/Container/getBoardApi";
import Navbar from "../../Components/Common/Navbar";
import { useState, useEffect } from "react";
import { Body, BodyContainer } from "../../Components/Common/Body";
import { LinkButton, Button } from "./Board.element";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Comment from "../Comment/Comment";

export default function ViewBoard() {
    const [boardList, setBoardList] = useState([]);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const table = searchParams.get("table") || null;
    const page = parseInt(searchParams.get("page")) || 1;
    const no = parseInt(searchParams.get("no")) || null;

    const commentPage = parseInt(searchParams.get("commentPage")) || 1;

    useEffect(() => {
        getViewBoard(table, page, no)
        .then(res => {
            setBoardList(res[0]);
        })
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

    const handleSearchParams = (commentPage) => {
        setSearchParams({
            table: table,
            page: page,
            no: no,
            commentPage: commentPage,
        })
    }

    return(
        <>
            <Navbar />
                <Body>
                    <BodyContainer>
                        <h1>게시글 보기</h1>
                        <hr></hr>
                        <br></br>
                        <ViewerAPI value={boardList.text}/>
                        <br></br>
                        <div>댓글</div>
                        <br></br>
                        <Comment
                            table={table}
                            page={page}
                            no={no}
                        />
                        <br></br>
                        <br></br>
                        <LinkButton to={`/board/list?table=${table}&page=${page}`}>되돌아가기</LinkButton>
                        <LinkButton to={`/board/write?table=${table}&page=${page}&no=${no}&commentPage=${commentPage}`}>수정하기</LinkButton>
                        <Button onClick={deletePage}>삭제하기</Button>
                    </BodyContainer>
                </Body>
        </>
    )
}