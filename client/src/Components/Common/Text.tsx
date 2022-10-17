import styled from "styled-components";

export const Text = styled.div`
    color: ${(props: { color: any; theme: any }) => props.theme.color.mainText || 'white'};;
    font-size: ${(props: { size: any; }) => props.size || '1rem' };
    margin: ${(props: { margin: any; }) => props.margin || '0'};
`