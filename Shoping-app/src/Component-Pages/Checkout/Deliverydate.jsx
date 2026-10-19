
import dayjs from 'dayjs';
export function DeliveryDate({cartitem,deliveryOptions,}){
   const selectedDeliveryOPtion = deliveryOptions.find((deliveryOption)=>{
            return deliveryOption.id === cartitem.deliveryOptionId;
          });
  return(
      <div className="delivery-date">
        Delivery date: {dayjs(selectedDeliveryOPtion.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>
  )
  
}