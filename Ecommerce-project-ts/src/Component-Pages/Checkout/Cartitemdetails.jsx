import {formatMoney} from '../../utils/money';
import axios from 'axios';
import {useState} from 'react';
export function CartitemDetails({cartitem , loadCart}){

  const [isUpdatingQuantity,setIsUpdatingQuantity]= useState(false);
  
  const [quantity,setQuantity]=useState(cartitem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartitem.productId}`)
    await loadCart();
  };

  const updateQuantity = async ()=>{
    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartitem.productId}`,{
        quantity: Number(quantity),
      });

      await loadCart();

      setIsUpdatingQuantity(false);

    } else {
      setIsUpdatingQuantity(true);
    }
  };
  const updateQuantityInput=(event)=>{
    setQuantity(event.target.value);
  };

  const handleQuantityKeyDown = (event) =>{
    const keyPressed = event.key;

    if(keyPressed === 'Enter'){
      updateQuantity();
    }else if(keyPressed === 'Escape'){
      setQuantity(cartitem.quantity);
      setIsUpdatingQuantity(false);
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
              ?<input type='text' className='quantity-textbox' value={quantity}
               onChange={updateQuantityInput} onKeyDown={handleQuantityKeyDown}/>
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