import styled from "styled-components";

export const Gridmain = styled.div`
	display : grid;
	height : 100vh;
	background-color : #fff;
	grid-template-rows : 100px 300px 300px;
	grid-template-areas:
    "header header header"
    "content content content"
	"content2 content2 content2"
	"footer footer footer";
	text-align: center;
	grid-gap: 0.25rem;
`