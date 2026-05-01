import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';

export function OrderSummary({ deliveryOptions, cart }) {
  return (
    <div className="order-summary">
      {/* Delivery Options start off as empty, so we need to check if the delivery options length is greater than 0. */}

      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        // Delivery Date is determined by whichever delivery option is selected. So we need to find it.
        const selectedDeliveryOption = deliveryOptions
          .find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

        return (
          <div key={cartItem.productId}
            className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} />
            </div>
          </div>
        );
      })}
    </div>
  );
};