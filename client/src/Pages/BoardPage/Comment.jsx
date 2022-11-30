import { useState, useEffect, useRef } from "react";
import CommentList from "./CommentList"
import CommentBox from "./CommentBox"
import Paging from "../../Components/Common/Paging"
import { getCommentList, postComment, deleteComment } from "../../Components/Container/getCommentApi"
import { useSearchParams } from "react-router-dom";

export default function Comment({
    table,
    no,
    page,
    commentList,
    setCommentList }) {

    const mounted = useRef(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // const [commentPage, setCommentPage] = useState(parseInt(searchParams.get("commentPage")) || 1);
    const [commentPage, setCommentPage] = useState(1);
    const [commentCount, setCommentCount] = useState(0); // api 받아와야함
    const [commentLimit, setCommentLimit] = useState(2); // 한 페이지에 보여줄 포스트 갯수
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5) // 보여줄 페이지 범위 개수

    useEffect(() => {
        // if (!mounted.current) {
        //     mounted.current = true;
        // }
        // else {
            getCommentList(table, no, commentPage, commentLimit)
            .then(res => {
                // console.log(res)
                setCommentCount(res[1][0].count); // 총 게시글 갯수
                setCommentList(res[0]); // 현재 페이지 게시글
            })
            .catch(err => console.log(err));
        // }
    }, [commentPage])

    const handleSearchParams = (commentPage) => {
        setSearchParams({table, page, no, commentPage: commentPage});
    }

    return(
        <>
            <CommentList 
                table={table}
                no={no}
                commentList={commentList}
                setCommentList={setCommentList}
            />
            <Paging 
                totalCount={commentCount}
                page={commentPage}
                limit={commentLimit}
                setPage={setCommentPage}
                handleSearchParams={handleSearchParams}
                pageRangeDisplayed={pageRangeDisplayed}
            />
            <CommentBox />
        </>
    )
}
