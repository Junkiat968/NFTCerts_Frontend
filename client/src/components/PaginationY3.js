import React from "react";
import PaginationBar from 'react-bootstrap/Pagination';

const PaginationY3 = ({ gradesPerPageY3, totalGradesY3, paginateY3, currentPageY3}) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(totalGradesY3 / gradesPerPageY3);

  var isFirstPage = true;
  var isLastPage = true;
  if (currentPageY3 === 1) {
    isFirstPage = true;
  } else {
    isFirstPage = false;
  }
  if (currentPageY3 === pageCount) {
    isLastPage = true;
  } else {
    isLastPage = false;
  }

  for (let i = 1; i <= Math.ceil(totalGradesY3 / gradesPerPageY3); i++) {
    // pageNumbers.push(i);
    pageNumbers.push(
      <PaginationBar.Item key={i} active={i === currentPageY3} onClick={() => onPageNumberClick(i)}>
        {i}
      </PaginationBar.Item>
    );
  }

  const onFirstPageClick = () => {
    paginateY3(currentPage => 1);
  };
  const onPageNumberClick = pageNumber => {
    paginateY3(pageNumber);
  };
  const onPreviousPageClick = () => {
    paginateY3(currentPage => currentPage - 1);
  };
  const onNextPageClick = () => {
    paginateY3(currentPage => currentPage + 1);
  };
  const onLastPageClick = () => {
    paginateY3(currentPage => pageCount);
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

export default PaginationY3;