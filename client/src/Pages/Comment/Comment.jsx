import { useState, useEffect, useRef } from "react";
import CommentList from "./CommentList"
import CommentBox from "./CommentBox"
import Paging from "../../Components/Common/Paging"
import { getCommentList, postComment, deleteComment } from "../../Components/Container/getCommentApi"
import { useSearchParams } from "react-router-dom";

export default function Comment({
    table,
    no,
    page }) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [commentPage, setCommentPage] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [commentCount, setCommentCount] = useState(0); // api 받아와야함
    const [commentLimit, setCommentLimit] = useState(30); // 한 페이지에 보여줄 포스트 갯수
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5) // 보여줄 페이지 범위 개수

    const [selectedCommentIndex, setSelectedCommentIndex] = useState();
    const [pId, setPid] = useState(null);

    const [selectedModalIndex, setSelectedModalIndex] = useState();

    const handleGetCommentList = (flagPost) => {
        getCommentList(table, no, commentPage, commentLimit)
        .then(res => {
            setCommentCount(res[1][0].count); // 총 게시글 갯수
            setCommentList(res[0]); // 현재 페이지 게시글
            if (flagPost) {
                setCommentPage(Math.ceil(res[1][0].count / commentLimit));
            }
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        if (searchParams.get("commentPage")) {
            setCommentPage(parseInt(searchParams.get("commentPage")));
        }
        handleGetCommentList();
    }, [commentPage]);

    const handleSearchParams = (commentPage) => {
        setSearchParams({table, page, no, commentPage: commentPage});
    }

    return(
        <>
            {commentList.map((comment, index) => (
                <CommentList 
                    key={index}
                    index={index}
                    table={table}
                    no={no}
                    setPid={setPid}
                    id={comment.id}
                    pId={comment.p_id}
                    date={comment.date}
                    text={comment.text}
                    hit={comment.hit}
                    nickTag={comment.nick_tag}
                    setSelectedCommentIndex={setSelectedCommentIndex}
                    isSelectedReply={selectedCommentIndex === index ? true : false}
                    handleGetCommentList={handleGetCommentList}
                    commentCount={commentCount}
                    commentPage={commentPage}
                    setCommentPage={setCommentPage}
                    commentLimit={commentLimit}
                    isSelectedModal={selectedModalIndex === index ? true : false}
                    setSelectedModalIndex={setSelectedModalIndex}
                />
            ))}
            <Paging 
                totalCount={commentCount}
                page={commentPage}
                limit={commentLimit}
                setPage={setCommentPage}
                handleSearchParams={handleSearchParams}
                pageRangeDisplayed={pageRangeDisplayed}
            />
            <CommentBox 
                table={table}
                no={no}
                setCommentPage={setCommentPage}
                commentCount={commentCount}
                handleGetCommentList={handleGetCommentList}
                commentLimit={commentLimit}
                setSelectedCommentIndex={setSelectedCommentIndex}
            />
        </>
    )
}
