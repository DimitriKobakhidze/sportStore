import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./addProductPage.css";
import ApiService from "../../../services/apiService";
import { useMutation, useQueryClient } from "react-query";

const AddProductPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [productInput, setProductInput] = useState({
    title: "",
    type: "shirts",
    stars: "5",
    reviewCount: "",
    price: "",
    description: "",
    imageUrl: ["", "", "", ""],
  });

  const updateInput = (e) => {
    const { value, name } = e.target;

    if (name === "imageUrl") {
      const index = parseInt(e.target.dataset.index);
      setProductInput((prev) => ({
        ...prev,
        [name]: prev.imageUrl.map((url, i) => (i === index ? value : url)),
      }));
    } else {
      setProductInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const { mutateAsync, error } = useMutation({
    mutationFn: () => ApiService.addProduct(productInput),
    onSuccess: (res) => {
      const id = res.data;
      navigate(`/products/${id}`);
      queryClient.invalidateQueries(["category"]);
    },
  });

  return (
    <div className="form">
      {error && <span className="error-span">{error}</span>}
      <span>Title</span>
      <input name="title" value={productInput.title} onInput={updateInput} />
      <span>Price</span>
      <input
        type="number"
        name="price"
        value={productInput.price}
        onInput={updateInput}
      />
      <span>Type</span>
      <select
        value={productInput.type}
        onInput={updateInput}
        name="type"
        defaultValue="shirts"
      >
        <option value="shirts">Shirts</option>
        <option value="trousers">Trousers</option>
        <option value="shorts">Shorts</option>
        <option value="shoes">Shoes</option>
      </select>
      <span>Stars Amount</span>
      <select value={productInput.stars} onChange={updateInput} name="stars">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span>Reviews Amount</span>
      <input
        type="number"
        name="reviewCount"
        value={productInput.reviewCount}
        onChange={updateInput}
      />
      <span>Description</span>
      <textarea
        name="description"
        onInput={updateInput}
        value={productInput.description}
      ></textarea>
      {productInput.imageUrl.map((url, index) => (
        <div key={index}>
          <span>{`Image ${index + 1} address (URL):`}</span>
          <input
            name="imageUrl"
            data-index={index}
            value={url}
            onChange={updateInput}
          />
        </div>
      ))}
      <button onClick={mutateAsync}>Add</button>
    </div>
  );
};

export default AddProductPage;
