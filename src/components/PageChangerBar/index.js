import "./pageChangerBar.css";

const PageChangerBar = ({
  prodName,
  sortId,
  page,
  setQueryParams,
  lastPage,
}) => {
  // console.log(page);
  // console.log(sortId);
  // console.log(prodName);
  const isPositive = page > 0;
  const moreThanLimit = page > lastPage;
  const firstPage = page === 1;
  const moreThan3page = page > 3;
  const isLastPage = page === lastPage;

  const changePage = (e) => {
    setQueryParams({ page: +e.target.dataset.page, sortId, prodName });
  };

  return (
    <div className="page-changer">
      <span
        className="changer-number"
        onClick={changePage}
        data-page="1"
        style={
          page === 1
            ? {
                fontWeight: "bold",
              }
            : {}
        }
      >
        1
      </span>
      {isPositive && !moreThanLimit && page - 1 > 1 && (
        <>
          {moreThan3page && <span>...</span>}
          <span
            className="changer-number"
            onClick={changePage}
            data-page={page - 1}
          >
            {page - 1}
          </span>
        </>
      )}
      {isPositive && !moreThanLimit && !firstPage && (
        <span
          className="changer-number"
          onClick={changePage}
          data-page={page}
          style={{ fontWeight: "bold" }}
        >
          {page}
        </span>
      )}
      {!isLastPage && isPositive && !moreThanLimit && (
        <span
          className="changer-number"
          onClick={changePage}
          data-page={page + 1}
        >
          {page + 1}
        </span>
      )}
      {((lastPage > 2 && lastPage - 1 > page) || moreThanLimit) && (
        <span
          className="changer-number"
          data-page={lastPage}
          onClick={changePage}
        >
          ...{lastPage}
        </span>
      )}
    </div>
  );
};

export default PageChangerBar;
