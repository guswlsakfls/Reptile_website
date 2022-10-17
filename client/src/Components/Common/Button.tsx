import styled from "styled-components"

export const CardButton = styled.button`
    color: white;
    background-color: ${(props: { theme: any; }) => props.theme.color.button };
    border-radius: 0.3rem;
    padding: 7px 13px;
`