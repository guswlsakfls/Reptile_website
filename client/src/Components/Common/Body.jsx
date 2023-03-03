import styled from "styled-components";

export const Body = styled.div`
    padding-top: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.color.background};
`

export const NavContainer = styled.div`
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 960px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 720px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        max-width: 540px;
    }
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 0 15px;
`

export const BodyContainer = styled.div`
    @media (min-width: 1200px) {
        max-width: 1040px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
        max-width: 860px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
        max-width: 620px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        max-width: 440px;
    }
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 0 15px;
`