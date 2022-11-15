import styled from "styled-components";
import BoardList from "./BoradList";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import { Link } from "react-router-dom";

export default function Board() {

    return (
        <>
            <Navbar />
            <Body>
                <Container>
                    <BoardList />
                    <LinkButton to="/board/write">글쓰기</LinkButton>
                    <button>수정하기</button>
                    <button>삭제하기</button>
                </Container>
            </Body>
        </>
    );
};

const LinkButton = styled(Link)`
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 3px;
    color: #000;
    text-decoration: none;
    &:hover {
        background-color: #000;
        color: #fff;
    }
`;
