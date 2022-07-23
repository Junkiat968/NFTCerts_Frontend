import React from "react";
import PaginationBar from 'react-bootstrap/Pagination';

const PaginationY2 = ({ gradesPerPageY2, totalGradesY2, paginateY2, currentPageY2}) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(totalGradesY2 / gradesPerPageY2);

  var isFirstPage = true;
  var isLastPage = true;
  if (currentPageY2 === 1) {
    isFirstPage = true;
  } else {
    isFirstPage = false;
  }
  if (currentPageY2 === pageCount) {
    isLastPage = true;
  } else {
    isLastPage = false;
  }

  for (let i = 1; i <= Math.ceil(totalGradesY2 / gradesPerPageY2); i++) {
    // pageNumbers.push(i);
    pageNumbers.push(
      <PaginationBar.Item key={i} active={i === currentPageY2} onClick={() => onPageNumberClick(i)}>
        {i}
      </PaginationBar.Item>
    );
  }

  const onFirstPageClick = () => {
    paginateY2(currentPage => 1);
  };
  const onPageNumberClick = pageNumber => {
    paginateY2(pageNumber);
  };
  const onPreviousPageClick = () => {
    paginateY2(currentPage => currentPage - 1);
  };
  const onNextPageClick = () => {
    paginateY2(currentPage => currentPage + 1);
  };
  const onLastPageClick = () => {
    paginateY2(currentPage => pageCount);
  };

  return (
    <PaginationBar>
      <PaginationBar.First onClick={onFirstPageClick} disabled={isFirstPage} />
      <PaginationBar.Prev onClick={onPreviousPageClick} disabled={isFirstPage} />
      {pageNumbers}
      <PaginationBar.Next onClick={onNextPageClick} disabled={isLastPage} />
      <PaginationBar.Last onClick={onLastPageClick} disabled={isLastPage} />
    </PaginationBar>
  );
};

export default PaginationY2;