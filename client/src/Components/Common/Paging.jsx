import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = ({totalCount,
                  postPerPage,
                  pageRangeDisplayed,
                  handlePageChange,
                  page}) => {

  return (
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={postPerPage} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={totalCount ? totalCount : 0} // 총 아이템 갯수
      pageRangeDisplayed={pageRangeDisplayed} // paginator의 페이지 범위
      prevPageText={"이전"} // "이전"을 나타낼 텍스트
      nextPageText={"다음"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
};

export default Paging;