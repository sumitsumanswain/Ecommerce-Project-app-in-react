import {OrderDetailsGrid} from './Ordersdetailsgrid';
import {OrderHeader} from './Orderheader';
export function OrderGrides({orders}){
  return(
     <div className="orders-grid">
          {orders.map((order)=>{
            return(
              <div key={order.id} className="order-container">

                 <OrderHeader order={order} />

                 <OrderDetailsGrid order={order} />
              </div>
            );
          })}
          
        </div>
  )
}