import styled from "styled-components";

export const Div = styled.div`
    padding-top: 90px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.color.background};
`