
import { useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/checkmark.png";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const addToCart = async () => {
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });

      await loadCart();

      setShowAddedMessage(true);

      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const price = product.priceCents ?? product.priceRupes ?? 0;

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} out of 5 stars`}
        />

        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(price)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          data-testid="product-quantity-selector"
          aria-label={`Quantity for ${product.name}`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer" />

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
        aria-live="polite"
      >
        <img src={CheckmarkIcon} alt="" />
        Added
      </div>

      <button
        type="button"
        className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
}
