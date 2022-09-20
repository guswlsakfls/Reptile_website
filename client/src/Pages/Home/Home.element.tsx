import styled from "styled-components"

export const Container = styled.div`
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

export const Header = styled.header`
    background-color: ${(props: { theme: any; }) => props.theme.color.basis};
    color: white;
    padding: 60px 30px;
`

export const HeaderTitle = styled.h1`
    font-size: 60px;
    margin-bottom: 20px;
`

export const HeaderBody = styled.p`
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 15px;
`

export const Divide = styled.div`
    border-top: 1px solid ${(props: { theme: any; }) => props.theme.color.mainColor};
    border-bottom: 1px solid ${(props: { theme: any; }) => props.theme.color.mainColor};
    padding: 15px 0;
    margin-top: 50px;
    margin-bottom: 15px;
`

export const Div = styled.div`
    padding-top: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const SubTitle = styled.span`
    color: white;
    padding-left: 15px;
    font-size: 15px;
    font-weight: 700;
`

export const Title = styled.nav`
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
    color: white;
    font-size: 30px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
`