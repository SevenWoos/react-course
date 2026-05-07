import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {/* Delivery Options start off as empty, so we need to check if the delivery options length is greater than 0. */}

      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        

        return (
          <div key={cartItem.productId}
            className="cart-item-container">
            
            <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />

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