import styled from "styled-components";
import { useState, useEffect } from "react";

const wholeTextArray = [
  'Oreo',
  'Zero',
  'Stripe',
  'Whiteout',
  'Ghost',
  'Normal',
  'Caramel',
  '오레오',
  '제로',
  '스트라이프',
  '화이트아웃',
  '고스트',
  '노멀',
  '카라멜',
  '헷오레오',
]

const AutoCompleteInput = ({parent, setParent, parentList, setParentList}) => {
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const showDropDownList = () => {
    if (parent === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    }
    else {
      const choosenTextList = wholeTextArray.filter(textItem =>
        textItem.includes(parent)
      )
      setDropDownList(choosenTextList)

    }
  }

  const clickDropDownItem = clickedItem => {
    if (parentList.includes(parent)) {
      setParent("");
      return;
    }
    setParentList([...parentList, clickedItem]);
    setParent("");
    setIsHaveInputValue(false)
  }

  // 부모 유전자 입력
  const onChangeParent = (e) => {
      setParent(e.target.value);
      setIsHaveInputValue(true)
  }

  const onKeyPress = (e) => {
    if (e.isComposing) return ; // 한글 2번 입력 방지

    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (e.key === 'ArrowDown' && dropDownList.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }
      else if (e.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1)
      }
      else if (e.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
      else if (e.key === 'Enter' && dropDownItemIndex < 0) {
        if (parent !== "") {
          // 같은 input값 입력 방지
          if (parentList.includes(parent)) {
              setParent("");
              return;
          }
          setParentList([...parentList, parent]);
          setParent("");
        }
      }
    }
  }

  // inputBox에 포커스가 없을때(여기 input에는 적용 불가!), 나중에 박스에 포커스가 없을때로 바꿔야함
  const onBlurParent = e => {
    if (parent !== "") {
        setParentList([...parentList, parent]);
        setParent("");
    }
  }

  useEffect(showDropDownList, [parent])

  return (
    <WholeBox>
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
            type='text'
            value={parent} 
            onKeyUp={onKeyPress}
            onChange={onChangeParent}
        />
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem}
              </DropDownItem>
            )
          })}
        </DropDownBox>
      )}
    </WholeBox>
  )
}

// const activeBorderRadius = '16px 16px 0 0'
// const inactiveBorderRadius = '16px 16px 16px 16px'
const activeBorderRadius = '0 0 0 0'
const inactiveBorderRadius = '0 0 0 0'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 10;
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`

export default AutoCompleteInput