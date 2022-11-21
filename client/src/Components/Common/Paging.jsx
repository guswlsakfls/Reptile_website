import styled from "styled-components";

// import './Paging.css';
// import Pagination from "react-js-pagination";

// const Paging = ({totalCount,
//                   postPerPage,
//                   pageRangeDisplayed,
//                   handlePageChange,
//                   page}) => {

//   return (
//     <Pagination
//       activePage={page} // 현재 페이지
//       itemsCountPerPage={postPerPage} // 한 페이지랑 보여줄 아이템 갯수
//       totalItemsCount={totalCount ? totalCount : 0} // 총 아이템 갯수
//       pageRangeDisplayed={pageRangeDisplayed} // paginator의 페이지 범위
//       prevPageText={"이전"} // "이전"을 나타낼 텍스트
//       nextPageText={"다음"} // "다음"을 나타낼 텍스트
//       onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
//     />
//   );
// };

const Paging = ({totalCount, limit, page, setPage, handleSearchParams}) => {
  const numPages = Math.ceil(totalCount / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => {
          setPage(page - 1);
          handleSearchParams(page - 1);}}
          disabled={page === 1}
        >
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                handleSearchParams(i + 1);}}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => {
          setPage(page + 1);
          handleSearchParams(page + 1);}}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;


export default Paging;