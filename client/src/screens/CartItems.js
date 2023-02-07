
import { MdDelete } from "react-icons/md"

export default function CartItems({ imageURL, productName, productColor, productSize, productPrice, deleteItem }) {




  return (

    <div className="item1">
      <div className="product-image">
        <img src={imageURL} alt="Could Not load!"></img>
      </div>
      <div className="product-contents">
        <div className="product-name">
          {productName}
        </div>
        <div className="product-color">
          {productColor}
        </div>
        <div className="product-size">
          {productSize}
        </div>
      </div>
      <div className="product-price-quantity">
        <div className="product-price">
          Price: ${productPrice}
        </div>
        <div className="product-quantity">

        </div>
      </div>
      <div className="deleteItemContainer">
        <button className="deleteItem" onClick={() => deleteItem(productName)}><MdDelete /></button>
      </div>
    </div>
  );
}