import styled from "styled-components";

const deleteMorph = ({setMorphList, morphList, id, e}) => {
    e.preventDefault();
    setMorphList(morphList.filter((item, index) => index !== id));
}

const AddMorphName = ({morphList, setMorphList}) => {
    return (
        morphList.map((item, id) => (
            <Li key={id} onClick={(e) => deleteMorph({setMorphList, morphList, id, e})}>
                x&nbsp;{item}
            </Li>
        ))
    );
}

const Li = styled.li`
    border: 1px solid black;
    padding: 2px;
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
`

export default AddMorphName