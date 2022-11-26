import { CardContainer } from "../../Components/Common/Card";
import { Body, Container } from "../../Components/Common/Body";
import { Header, HeaderTitle, HeaderBody, Divide, SubTitle } from "./Home.element";
import { CardList } from "../../Components/Presentation/CardList";
import Navbar from "../../Components/Common/Navbar";
import styled from "styled-components";
import { Gridmain } from "../../Components/Common/Gridmain";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
           <Gridmain>
		   <Headera>logo</Headera>
		   <ContentBox>
		   <Content1 to="/fathome">FattailGecko</Content1>
     				<Content2>Content2</Content2>
     				<Content3>Content3</Content3>
		   </ContentBox>
		   <ContentBox2>
     				<Content4>Content4</Content4>
     				<Content5>Content5</Content5>
     				<Content6>Content6</Content6>
				</ContentBox2>
				<Footer>문의 irang4605@naver.com </Footer>

		   </Gridmain>
        </> 
    );
};

const Headera = styled.div`
	background : green;
	grid-area: header;
	padding : 0.15rem;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
`;

const Content1 = styled(Link)`
  background: #a6b8b9;
  color: white;
  font-size: 25px;
  padding: 1rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Content4 = styled.div`
background: red;
padding: 0.25rem;
width: 100%;
height: 100%;
`;
const Content5 = styled(Content4)``;
const Content6 = styled(Content4)``;
;

const ContentBox2 = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
  grid-area: content2;
  justify-content: center;
`;

const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`;