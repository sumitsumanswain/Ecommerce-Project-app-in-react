
import dayjs from 'dayjs';
export function DeliveryDate({selectedDeiveryOPtion}){
  return(
    <>
      <div className="delivery-date">
        Delivery date: {dayjs(selectedDeiveryOPtion.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>
    </>
  )
  
}