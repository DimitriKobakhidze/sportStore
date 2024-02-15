import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./productDetailPage.css";
import ApiService from "../../services/apiService";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailSideBar from "../ProductDetailSideBar";
import Spinner from "../Spinner";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ProductDetailPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { prodId } = useParams();
  const [mainPic, setMainPic] = useState("");

  const { mutateAsync: addToCart } = useMutation({
    mutationFn: () => {
      if (!auth.token) return navigate("/login");
      ApiService.addToCart(prodId);
    },
    onSuccess: () => alert("Successfuly Added"),
  });

  const { mutateAsync: deleteFromDb } = useMutation({
    mutationFn: () => ApiService.deleteProductFromDb(prodId),
    onSuccess: () => {
      queryClient.invalidateQueries("category");
      navigate("/");
    },
  });

  const {
    data: res,
    error: fetchError,
    isLoading,
  } = useQuery({
    queryKey: ["product", prodId], // Ensure the query key is unique and descriptive
    queryFn: () => ApiService.getProduct(prodId),
  });

  if (fetchError) return <h1>Error</h1>;
  if (isLoading) return <Spinner />;

  return (
    <div className="product-detail">
      <ProductDetailSideBar
        imageUrl={res.data.imageUrl}
        setMainPic={setMainPic}
      />
      <img
        src={mainPic || res.data.imageUrl}
        alt={res.data.name}
        className="product-image"
      />
      <div className="product-info">
        <h1 className="product-name">{res.data.title}</h1>
        <p className="product-description">{res.data.description}</p>
        <p className="product-price">${res.data.price}</p>
        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        {auth.isAdmin && (
          <button className="remove-product-db" onClick={deleteFromDb}>
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
