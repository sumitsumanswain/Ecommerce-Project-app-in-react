
import {DeliveryOption} from './DeliveryOptions';
import {CartitemDetails} from './Cartitemdetails';
import {DeliveryDate} from './Deliverydate';
export function OrderSummery({cart,deliveryOptions,loadCart}){
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartitem)=>{
           
    
          return(
            <div key={cartitem.productID} className="cart-item-container">
               
    
              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={cartitem.product.image} />
    
                 
    
                <DeliveryOption cartitem={cartitem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                <CartitemDetails cartitem = {cartitem} loadCart={loadCart}/>
                <DeliveryDate cartitem={cartitem} deliveryOptions={deliveryOptions}/>
              </div>
            </div>
          );
      })}
                 
    </div>
  )
}