import styled from "styled-components";

const Paging = ({
  totalCount,
  limit, page,
  setPage,
  handleSearchParams,
  pageRangeDisplayed}) => {

  const numPages = Math.ceil(totalCount / limit); // 총 페이지 수
  const pageRange = parseInt(Math.floor((page - 1) / pageRangeDisplayed)) * pageRangeDisplayed; // 페이지 범위

  return (
    <>
      <Nav>
        <Button onClick={() => {
          setPage((Math.floor((page - 1)/pageRangeDisplayed) - 1) * 5 + 1);
          handleSearchParams((Math.floor((page - 1)/pageRangeDisplayed) - 1) * 5 + 1);}}
          disabled={page <= 5}
        >
          &lt;
        </Button>
        {Array(numPages)
          .splice(pageRange, pageRangeDisplayed)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + pageRange + 1);
                handleSearchParams(i + pageRange + 1);}}
                aria-current={page === i + pageRange + 1 ? "page" : null}
            >
              {i + pageRange + 1}
            </Button>
          ))}
        <Button onClick={() => {
          setPage((Math.floor((page - 1)/pageRangeDisplayed) + 1) * 5 + 1);
          handleSearchParams((Math.floor((page - 1)/pageRangeDisplayed) + 1) * 5 + 1);}}
          disabled={pageRange + pageRangeDisplayed >= numPages}
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