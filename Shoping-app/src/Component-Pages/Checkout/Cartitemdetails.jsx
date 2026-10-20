import {formatMoney} from '../../utils/money';
import axios from 'axios';
import {useState} from 'react';
export function CartitemDetails({cartitem , loadCart}){
  const [isUpdatingQuantity,setIsUpdatingQuantity]= useState(false);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartitem.productId}`)
    await loadCart();
  };
  const updateQuantity = ()=>{
    if (isUpdatingQuantity) {
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
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
            Quantity:{isUpdatingQuantity 
              ?<input type='text' className='quantity-textbox' />
              :<span className="quantity-label">{cartitem.quantity}</span>
            }                          
          </span>
          <span className="update-quantity-link link-primary"
          onClick={updateQuantity}>
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