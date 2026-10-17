
import {DeliveryOption} from './DeliveryOptions';
import {CartitemDetails} from './Cartitemdetails';
import {DeliveryDate} from './Deliverydate';
export function OrderSummery({cart,deliveryOptions}){
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartitem)=>{
          const selectedDeiveryOPtion = deliveryOptions.find((deliveryOption)=>{
            return deliveryOption.id === cartitem.deliveryOptionId;
          })
    
          return(
            <div key={cartitem.productID} className="cart-item-container">
               
    
              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={cartitem.product.image} />
    
                 
    
                <DeliveryOption cartitem={cartitem} deliveryOptions={deliveryOptions}/>
                <CartitemDetails cartitem = {cartitem} />
                <DeliveryDate selectedDeiveryOPtion={selectedDeiveryOPtion}/>
              </div>
            </div>
          );
      })}
                 
    </div>
  )
}