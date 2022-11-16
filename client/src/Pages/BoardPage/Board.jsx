import styled from "styled-components";
import BoardList from "./BoradList";
import Navbar from "../../Components/Common/Navbar";
import { Body, Container } from "../../Components/Common/Body";
import { LinkButton } from "./Board.element";

export default function Board() {

    return (
        <>
            <Navbar />
            <Body>
                <Container>
                    <BoardList />
                    <LinkButton to="/board/write">글쓰기</LinkButton>
                </Container>
            </Body>
        </>
    );
};
