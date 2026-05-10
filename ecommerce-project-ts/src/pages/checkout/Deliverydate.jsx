import dayjs from 'dayjs';

export function DeliveryDate({ cartItem, deliveryOptions }) {
  // Delivery Date is determined by whichever delivery option is selected. So we need to find it.
  const selectedDeliveryOption = deliveryOptions
    .find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;
    });

  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
};