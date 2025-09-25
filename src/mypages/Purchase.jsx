import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API = "http://127.0.0.1:5000";

export default function PurchaseForm() {
  const [searchParams] = useSearchParams();
  const artworkIdParam = searchParams.get("artworkId");

  const [artwork, setArtwork] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const userId = 1; 

  useEffect(() => {
    loadArtwork();
    loadCart();
    
  }, [artworkIdParam]);

  async function loadArtwork() {
    try {
      if (artworkIdParam) {
        const res = await fetch(`${API}/artworks/${artworkIdParam}`);
        if (res.ok) setArtwork(await res.json());
      } else {
        const res = await fetch(`${API}/artworks`);
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) setArtwork(list[0]);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load artwork.");
    }
  }

  async function loadCart() {
    try {
      const res = await fetch(`${API}/cart/${userId}`);
      if (res.ok) setCartItems(await res.json());
      else setCartItems([]);
    } catch {
      setCartItems([]);
    }
  }

  async function handleAddToCart(e) {
    e.preventDefault();
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

  async function handleConfirmPurchase(e) {
    e.preventDefault();
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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Purchase Artwork</h1>

      {!artwork ? (
        <p>Loading artwork...</p>
      ) : (
        <form onSubmit={handleConfirmPurchase}>
          
          <div className="flex gap-6 mb-6">
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="w-64 h-48 object-cover rounded"
            />
            <div>
              <h2 className="text-2xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-600">
                by {artwork.artist?.name ?? "Unknown"}
              </p>
              <p className="text-xl font-bold mt-2">${artwork.price}</p>
              <p className="text-green-600 mt-2">Ready for Purchase</p>
            </div>
          </div>

          
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Select payment method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Please select a payment method</option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="mpesa">M-Pesa</option>
            </select>
          </div>

        
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirm Purchase • ${artwork.price}
            </button>
          </div>

          
          {message && (
            <div className="text-center text-sm text-green-700">{message}</div>
          )}
        </form>
      )}
    </div>
  );
}
