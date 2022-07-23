import React from "react";
import PaginationBar from 'react-bootstrap/Pagination';

const PaginationY1 = ({ gradesPerPageY1, totalGradesY1, paginateY1, currentPageY1}) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(totalGradesY1 / gradesPerPageY1);

  var isFirstPage = true;
  var isLastPage = true;
  if (currentPageY1 === 1) {
    isFirstPage = true;
  } else {
    isFirstPage = false;
  }
  if (currentPageY1 === pageCount) {
    isLastPage = true;
  } else {
    isLastPage = false;
  }

  for (let i = 1; i <= Math.ceil(totalGradesY1 / gradesPerPageY1); i++) {
    // pageNumbers.push(i);
    pageNumbers.push(
      <PaginationBar.Item key={i} active={i === currentPageY1} onClick={() => onPageNumberClick(i)}>
        {i}
      </PaginationBar.Item>
    );
  }

  const onFirstPageClick = () => {
    paginateY1(currentPage => 1);
  };
  const onPageNumberClick = pageNumber => {
    paginateY1(pageNumber);
  };
  const onPreviousPageClick = () => {
    paginateY1(currentPage => currentPage - 1);
  };
  const onNextPageClick = () => {
    paginateY1(currentPage => currentPage + 1);
  };
  const onLastPageClick = () => {
    paginateY1(currentPage => pageCount);
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

export default PaginationY1;