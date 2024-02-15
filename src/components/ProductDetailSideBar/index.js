import "./productDetailSideBar.css";

const ProductDetailSideBar = ({ imageUrl, setMainPic }) => {
  return (
    <div className="image-side-bar">
      {imageUrl.map((url, id) => (
        <img key={id} src={url} alt="product" onClick={() => setMainPic(url)} />
      ))}
    </div>
  );
};

export default ProductDetailSideBar;
