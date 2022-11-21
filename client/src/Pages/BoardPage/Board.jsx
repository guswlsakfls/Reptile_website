import BoardList from "./BoradList";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import { LinkButton } from "./Board.element";
import Paging from "../../Components/Common/Paging";
import { useState, useEffect } from "react";
import { getListBoard } from "../../Components/Container/getApi";
import { useSearchParams } from "react-router-dom";

export default function Board() {
    // 쿼리스트링 사용
    const [searchParams, setSearchParams] = useSearchParams();
    const table = searchParams.get("table") || null;
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

    const [count, setCount] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
    const [limit, setLimit] = useState(15); // 한 페이지에 보여줄 포스트 갯수
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(10) // 보여줄 페이지 범위 개수
    const indexOfLastPost = page * limit; // 현재 페이지의 마지막 포스트
    const indexOfFirstPost = indexOfLastPost - limit; // 현재 페이지의 첫번째 포스트

    useEffect(() => {
        // table 에서 게시판 이름 들어올때마다 바꿔서 보여주면 될 듯
        const nextTable = table === null ? "free-board" : table;

        setSearchParams({table: nextTable, page});
    }, []);

    // 현재 페이지 게시글 가져오기
    useEffect(() => {
        getListBoard(table, page, limit)
        .then(res => {
            setCount(res[1][0].count); // 총 게시글 갯수
            setCurrentPosts(res[0]); // 현재 페이지 게시글
        })
        .catch(err => console.log(err));
    }, [indexOfFirstPost, indexOfLastPost, page]);

    const handleSearchParams = (page) => {
        setSearchParams({table, page: page});
    }
    return (
        <>
            <Navbar />
            <Body>
                <Container>
                    <br></br>
                    <h1>자유 게시판</h1>
                    <hr></hr>
                    <br></br>
                    <BoardList boardList={currentPosts} table={table} page={page}/>
                    <Paging
                        totalCount={count}
                        page={page}
                        limit={limit}
                        setPage={setPage}
                        handleSearchParams={handleSearchParams}
                    />
                    <LinkButton to="/board/write">글쓰기</LinkButton>
                </Container>
            </Body>
        </>
    );
};