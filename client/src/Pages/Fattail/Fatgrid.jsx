import styled from "styled-components";

export const Fatgrid = styled.div`
	display : grid;
	height : 100vh;
	background-color : #fff;
	grid-template-rows : 100px 300px 300px;
	grid-template-areas:
    "header header header"
    "sidebar content content"
	"sidebar content content"
	"sidebar footer footer";
	text-align: center;
	grid-gap: 0.25rem;
`