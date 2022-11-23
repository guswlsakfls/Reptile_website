import styled from "styled-components";

const Paging = ({totalCount, limit, page, setPage, handleSearchParams, pageRangeDisplayed}) => {
  const numPages = Math.ceil(totalCount / limit);
  // const pageRange = parseInt(page / pageRangeDisplayed) * pageRangeDisplayed + 1;);
  const pageRange = parseInt((page - 1) / pageRangeDisplayed) * pageRangeDisplayed;

  console.log("page: ", page)
  console.log("pageRnage: ", pageRange)
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
          .splice(pageRange, pageRangeDisplayed)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {
                setPage(i + 1);
                handleSearchParams(i + 1);}}
                aria-current={page === i + pageRange + 1 ? "page" : null}
            >
              {i + pageRange + 1}
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