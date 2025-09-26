// src/pages/MyCollection.jsx
import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000";

export default function MyCollection() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const userId = 1; 

  useEffect(() => {
    loadPurchases();
    
  }, []);

  async function loadPurchases() {
    try {
      const res = await fetch(`${API}/purchases/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      } else {
        setMessage("❌ Failed to load purchases.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error while fetching purchases.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading your collection...</p>;

  if (purchases.length === 0)
    return <p className="text-center mt-10 text-gray-600">You haven't purchased any artwork yet.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">🎨 My Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={purchase.artwork.image_url}
              alt={purchase.artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{purchase.artwork.title}</h2>
              <p className="text-gray-600">by {purchase.artwork.artist?.name ?? "Unknown"}</p>
              
              <p className="mt-2 font-medium">
                Purchased by: <span className="text-gray-700">User #{purchase.user_id}</span>
              </p>
              
              {purchase.purchase_date && (
                <p className="text-sm text-gray-500 mt-1">
                  Purchased on: {new Date(purchase.purchase_date).toLocaleDateString()}
                </p>
              )}

              <p className="mt-2 font-bold text-green-600 text-lg">
                Price: ${purchase.artwork.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}
