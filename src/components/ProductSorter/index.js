import "./productSorter.css";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export const ProductSorter = ({ page, sortId, prodName, setQueryParams }) => {
  const [searchInput, setSearchInput] = useState(prodName);

  return (
    <div className="product-sorter">
      <div className="name-input-warpper">
        <input
          className="search-input"
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("hello");
              setQueryParams({
                page: 1,
                sortId,
                prodName: `${searchInput}`,
              });
            }
          }}
        />
        <span
          className="search-icon-wrapper"
          onClick={() =>
            setQueryParams({
              page: 1,
              sortId,
              prodName: `${searchInput}`,
            })
          }
        >
          <IoSearch className="search-icon" />
        </span>
      </div>
      <span>Sort By</span>
      <select
        onChange={(e) =>
          setQueryParams({
            page,
            sortId: e.target.value,
            prodName,
          })
        }
        value={sortId}
      >
        <option value="1">Price Desc.</option>
        <option value="2">Price Asc.</option>
      </select>
    </div>
  );
};

export default ProductSorter;
