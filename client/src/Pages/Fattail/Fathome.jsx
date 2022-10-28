import styled from "styled-components";
import { Fatgrid } from "./Fatgrid"; 
import { Link } from "react-router-dom";


export function Fathome(){
	return(
		<Fatgrid>
			<Headera>logo</Headera>
			<SideBar>사이드 바</SideBar>
		<ContentBox>
			<Content1 to="/morph">펫테일 모프계산기</Content1>
			<Content2>모프 소개</Content2>
			<Content3>자유 게시판</Content3>
	   </ContentBox>
	   <Footer>문의 irang4605@naver.com </Footer>
		</Fatgrid>
	);
}


const Headera = styled.div`
	background : green;
	grid-area: header;
	padding : 0.15rem;
`;

const NavBar = styled.nav`
  background: #3a3a55;
  grid-area: nav;
  padding: 0.25rem;
`;
const Main = styled.main`
  background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;
const SideBar = styled.div`
  background: #9aaab7;
  grid-area: sidebar;
  padding: 0.25rem;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
`;
const ContentBox2 = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
  grid-area: content2;
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
const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
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

