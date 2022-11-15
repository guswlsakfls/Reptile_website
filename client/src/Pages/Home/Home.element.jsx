import styled from "styled-components"

export const Header = styled.header`
    background-color: ${(props) => props.theme.color.white };
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    border-radius: 5px;
    color: ${(props) => props.theme.color.mainText };
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
    border-top: 1px solid ${(props) => props.theme.color.mainColor};
    border-bottom: 1px solid ${(props) => props.theme.color.mainColor};
    padding: 15px 0;
    margin-top: 50px;
    margin-bottom: 15px;
`

export const SubTitle = styled.span`
    color: ${(props) => props.theme.color.mainText };
    padding-left: 15px;
    font-size: 15px;
    font-weight: 700;
`