// src/pages/Purchase.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API = "http://127.0.0.1:5000";

export default function Purchase() {
  const [searchParams] = useSearchParams();
  const artworkIdParam = searchParams.get("artworkId");

  const [artwork, setArtwork] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // TODO: replace with real logged-in user
  const userId = 1;

  useEffect(() => {
    loadArtwork();
    loadCart();
    // eslint-disable-next-line
  }, [artworkIdParam]);

  async function loadArtwork() {
    try {
      if (artworkIdParam) {
        const res = await fetch(`${API}/artworks/${artworkIdParam}`);
        if (res.ok) {
          setArtwork(await res.json());
        }
      } else {
        const res = await fetch(`${API}/artworks`);
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          setArtwork(list[0]);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load artwork.");
    }
  }

  async function loadCart() {
    try {
      const res = await fetch(`${API}/cart/${userId}`);
      if (res.ok) {
        setCartItems(await res.json());
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
      setCartItems([]);
    }
  }

  async function handleAddToCart() {
    if (!artwork) return;
    try {
      const res = await fetch(`${API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, artwork_id: artwork.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Added to cart");
        loadCart();
      } else {
        setMessage(data.error || data.message || "❌ Could not add to cart");
      }
    } catch {
      setMessage("❌ Network error adding to cart");
    }
  }

  async function handleConfirmPurchaseImmediate() {
    if (!paymentMethod) {
      setMessage("⚠️ Please select a payment method.");
      return;
    }
    if (!artwork) return;
    try {
      const res = await fetch(`${API}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          artwork_id: artwork.id,
          payment_method: paymentMethod,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Purchase successful — added to your collection.");
        loadCart();
      } else {
        setMessage(data.error || "❌ Purchase failed");
      }
    } catch {
      setMessage("❌ Network error during purchase");
    }
  }

  async function handleCheckoutCart() {
    try {
      const res = await fetch(`${API}/cart/checkout/${userId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Checkout complete — purchases saved.");
        setCartItems([]);
      } else {
        setMessage(data.error || "❌ Checkout failed");
      }
    } catch {
      setMessage("❌ Network error during checkout");
    }
  }

  async function handleRemoveCartItem(cartId) {
    try {
      const res = await fetch(`${API}/cart/${cartId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("🗑️ Removed from cart");
        loadCart();
      } else {
        const data = await res.json();
        setMessage(data.error || "❌ Could not remove item");
      }
    } catch {
      setMessage("❌ Network error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-3">Complete Your Purchase</h1>
      <p className="text-gray-700 mb-6">
        You're just one step away from owning this beautiful artwork
      </p>

      {!artwork ? (
        <p>Loading artwork...</p>
      ) : (
        <>
          {/* Artwork Details */}
          <div className="flex gap-6 mb-6">
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="w-64 h-48 object-cover rounded"
            />
            <div>
              <h2 className="text-2xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-600">by {artwork.artist?.name ?? "Unknown"}</p>
              <p className="text-xl font-bold mt-2">${artwork.price}</p>
              <p className="text-green-600 mt-2">Ready for Purchase</p>
            </div>
          </div>

          <p className="mb-6 text-gray-700">
            Once purchased, the artwork will be added to your collection and
            you'll receive a certificate of authenticity.
          </p>

          {/* Purchase Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Purchase Information</h3>
            <p>
              Buyer: <strong>User #{userId}</strong>
            </p>
            <p>
              Artwork: <strong>{artwork.title}</strong>
            </p>
            <p>
              Price: <strong>${artwork.price}</strong>
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select payment method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Please select a payment method</option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="mpesa">M-Pesa</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              onClick={handleConfirmPurchaseImmediate}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirm Purchase • ${artwork.price}
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Note: Once purchased, the artwork will be added to your collection.
            You will receive a digital certificate and shipping information
            within 24 hours.
          </p>

          {/* Cart Section */}
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">🛒 Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">No items in cart yet.</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border p-3 rounded"
                    >
                      <div>
                        <div className="font-medium">{item.artwork.title}</div>
                        <div className="text-sm text-gray-600">
                          by {item.artwork.artist?.name ?? "Unknown"}
                        </div>
                        <div className="text-sm text-gray-800 font-semibold">
                          ${item.artwork.price}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveCartItem(item.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleCheckoutCart}
                    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                  >
                    Checkout All
                  </button>
                  <div>
                    <span className="font-semibold">Total: </span>
                    <span className="text-lg">
                      $
                      {cartItems.reduce(
                        (sum, it) => sum + (it.artwork?.price || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {message && (
            <div className="mt-4 text-center text-sm text-green-700">
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
