import {formatMoney} from '../../utils/money';
import axios from 'axios';
export function CartitemDetails({cartitem , loadCart}){
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartitem.productId}`)
    await loadCart();
  };
  return (
    <>
      <div className="cart-item-details">
        <div className="product-name">
          {cartitem.product.name}
        </div>
        <div className="product-price">
            {formatMoney(cartitem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <span className="quantity-label">{cartitem.quantity}</span>                          
          </span>
          <span className="update-quantity-link link-primary">
            Update
          </span>
          <span className="delete-quantity-link link-primary"
          onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
    
  )
}