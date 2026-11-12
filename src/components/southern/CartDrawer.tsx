import { Link } from "@tanstack/react-router";

import { cartSubtotal, shippingProgress } from "@/lib/southern/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/southern/format";
import { addOns } from "@/lib/southern/products";
import { useShop } from "./ShopProvider";
import { useModalDialog } from "./useModalDialog";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, price, changeQty, addAddon, clearCart, showToast } = useShop();
  const { ref, onBackdropClick } = useModalDialog(cartOpen, () => setCartOpen(false));

  const subtotal = cartSubtotal(cart);
  const shipping = shippingProgress(subtotal);
  const suggestions = addOns.filter((addon) => !cart.some((item) => item.id === addon.id));

  const checkout = () => {
    if (!cart.length) return;
    setCartOpen(false);
    showToast(`Checkout stub · ${price(subtotal)}. Payment gateway simulation.`);
  };

  return (
    <dialog
      ref={ref}
      id="cartDrawer"
      className="cart-drawer"
      aria-labelledby="cartDrawerTitle"
      onClick={onBackdropClick}
    >
      <div className="cart-header">
        <span className="cart-title" id="cartDrawerTitle">
          Your bag
        </span>
        <button type="button" className="dialog-close-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}>
          ✕
        </button>
      </div>
      <div className="cart-items-list">
        {cart.length === 0 ? (
          <div className="empty-note">
            <p>Your bag is empty.</p>
            <Link
              to="/shop"
              className="btn-primary"
              style={{ marginTop: "1rem", display: "inline-flex" }}
              onClick={() => setCartOpen(false)}
            >
              Discover artifacts
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${item.selectedColor}`}>
                <div className="cart-thumb">
                  <div className="cart-thumb-placeholder" aria-hidden="true">✦</div>
                  {item.image && (
                    <img
                      className="media-fill cart-thumb-image"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div className="cart-item-copy">
                  <p className="cart-item-title">{item.name}</p>
                  <p className="cart-item-meta">
                    {item.selectedColor} · {item.selectedMode}
                  </p>
                  <p className="cart-item-price">{price(item.price)} each</p>
                </div>
                <div className="cart-qty-ctrl">
                  <button type="button" aria-label="Decrease" onClick={() => changeQty(idx, -1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" aria-label="Increase" onClick={() => changeQty(idx, 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
            {suggestions.length > 0 && (
              <>
                <p className="multiwear-title">Complete the look</p>
                {suggestions.map((addon) => (
                  <div className="cart-item" key={addon.id}>
                    <div className="cart-thumb">
                      <div className="cart-thumb-placeholder" aria-hidden="true">✦</div>
                      {addon.image && (
                        <img
                          className="media-fill cart-thumb-image"
                          src={addon.image}
                          alt={addon.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </div>
                    <div className="cart-item-copy">
                      <p className="cart-item-title">{addon.name}</p>
                      <p className="cart-item-price">{price(addon.price)}</p>
                    </div>
                    <button type="button" className="product-add-btn" onClick={() => addAddon(addon.id)}>
                      Add
                    </button>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      <div className="cart-footer">
        <div className="shipping-track">
          <div id="freeShippingBar" style={{ width: `${cart.length ? shipping.percent : 0}%` }} />
        </div>
        <p id="freeShippingNotice">
          {cart.length === 0
            ? `Add ${price(FREE_SHIPPING_THRESHOLD)} more for complimentary pan-India delivery.`
            : shipping.unlocked
              ? "Complimentary pan-India shipping unlocked."
              : `Add ${price(shipping.remaining)} more for complimentary shipping.`}
        </p>
        <div className="cart-subtotal-row">
          <span>Subtotal</span>
          <span>{price(subtotal)}</span>
        </div>
        <button type="button" className="cart-checkout-btn" onClick={checkout}>
          Proceed to checkout
        </button>
        <button type="button" className="text-btn" onClick={clearCart}>
          Clear bag
        </button>
      </div>
    </dialog>
  );
}
