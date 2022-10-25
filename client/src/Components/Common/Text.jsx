import styled from "styled-components";

export const Text = styled.div`
    color: ${(props) => props.theme.color.mainText || 'white'};;
    font-size: ${(props) => props.size || '1rem' };
    margin: ${(props) => props.margin || '0'};
`