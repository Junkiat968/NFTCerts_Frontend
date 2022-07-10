import React from "react";
import PaginationBar from 'react-bootstrap/Pagination';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  var isFirstPage = true;
  var isLastPage = true;
  if (currentPage === 1) {
    isFirstPage = true;
  } else {
    isFirstPage = false;
  }
  if (currentPage === pageCount) {
    isLastPage = true;
  } else {
    isLastPage = false;
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    // pageNumbers.push(i);
    pageNumbers.push(
      <PaginationBar.Item key={i} active={i === currentPage} onClick={() => onPageNumberClick(i)}>
        {i}
      </PaginationBar.Item>
    );
  }

  const onFirstPageClick = () => {
    paginate(currentPage => 1);
  };
  const onPageNumberClick = pageNumber => {
    paginate(pageNumber);
  };
  const onPreviousPageClick = () => {
    paginate(currentPage => currentPage - 1);
  };
  const onNextPageClick = () => {
    paginate(currentPage => currentPage + 1);
  };
  const onLastPageClick = () => {
    paginate(currentPage => pageCount);
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

export default Pagination;