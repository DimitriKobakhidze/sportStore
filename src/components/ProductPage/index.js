import { useParams, useSearchParams } from "react-router-dom";

import "./productPage.css";
import ApiService from "../../services/apiService";
import ProductItem from "../ProductItem";
import PageChangerBar from "../PageChangerBar";
import ProductSorter from "../ProductSorter";
import Spinner from "../Spinner";
import { useQuery } from "react-query";

export const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryName } = useParams();
  const pageNumber = +searchParams.get("page") || 1;
  const sortId = +searchParams.get("sortId") || 1;
  const prodName = searchParams.get("prodName") || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", categoryName, pageNumber, sortId, prodName],
    queryFn: () =>
      ApiService.getCategoryProducts(
        categoryName,
        pageNumber,
        sortId,
        prodName
      ),
    staleTime: Infinity,
  });

  if (error) return <h1>{error}</h1>;
  if (isLoading) return <Spinner />;

  return (
    <div className="product-page-container">
      <ProductSorter
        sortId={sortId}
        page={pageNumber}
        prodName={prodName}
        setQueryParams={setSearchParams}
      />
      <div className="product-wrapper">
        {data.data.products.map((product) => (
          <ProductItem key={product._id} productData={product} />
        ))}
      </div>
      <PageChangerBar
        page={pageNumber}
        prodName={prodName}
        sortId={sortId}
        setQueryParams={setSearchParams}
        categoryName={categoryName}
        lastPage={data.data.lastPage}
      />
    </div>
  );
};

export default ProductPage;
