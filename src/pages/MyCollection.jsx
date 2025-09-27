// src/pages/MyCollection.jsx
import React, { useEffect, useState } from "react";

const API = "https://art-gallery-marketplace-backend.onrender.com";

export default function MyCollection() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedPurchase, setSelectedPurchase] = useState(null); 
  const [editPurchase, setEditPurchase] = useState(null); 
  const [editForm, setEditForm] = useState({ title: "", price: "", description: "" });

  const userId = 1; 

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    try {
      const res = await fetch(`${API}/purchases/user/${userId}`);
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

  async function handleSell(purchaseId) {
    try {
      const res = await fetch(`${API}/purchases/${purchaseId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage(`✅ Artwork listed for sale.`);
        setPurchases(purchases.filter((p) => p.id !== purchaseId));
        setSelectedPurchase(null);
      } else {
        setMessage("❌ Failed to list artwork for sale.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error while selling artwork.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!editPurchase) return;

    try {
      const res = await fetch(`${API}/artworks/${editPurchase.artwork.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updatedArt = await res.json();

        // update state locally
        setPurchases((prev) =>
          prev.map((p) =>
            p.artwork.id === updatedArt.id ? { ...p, artwork: updatedArt } : p
          )
        );

        setMessage("✅ Artwork updated successfully!");
        setEditPurchase(null);
      } else {
        setMessage("❌ Failed to update artwork.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network error while updating artwork.");
    }
  }

  function openEditModal(purchase) {
    setEditPurchase(purchase);
    setEditForm({
      title: purchase.artwork.title || "",
      price: purchase.artwork.price || "",
      description: purchase.artwork.description || "",
    });
  }

  if (loading)
    return <p className="text-center mt-10">Loading your collection...</p>;

  if (purchases.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven't purchased any artwork yet.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">🎨 My Collection</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg">
          {message}
        </div>
      )}

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
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {purchase.artwork.title}
                </h2>
                <p className="text-gray-600">
                  by {purchase.artwork.artist?.name ?? "Unknown"}
                </p>
                {purchase.purchase_date && (
                  <p className="text-sm text-gray-500 mt-1">
                    Purchased on:{" "}
                    {new Date(purchase.purchase_date).toLocaleDateString()}
                  </p>
                )}
                <p className="mt-2 font-bold text-green-600 text-lg">
                  ${purchase.artwork.price}
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setSelectedPurchase(purchase)}
                  className="flex-1 bg-green-300 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Sell
                </button>
                <button
                  onClick={() => openEditModal(purchase)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {selectedPurchase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Sell Artwork</h2>
            <p className="mb-4">
              Are you sure you want to list{" "}
              <span className="font-semibold">
                {selectedPurchase.artwork.title}
              </span>{" "}
              for sale?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPurchase(null)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSell(selectedPurchase.id)}
                className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600"
              >
                Confirm Sell
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Edit Modal --- */}
      {editPurchase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Artwork</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Add a description..."
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditPurchase(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
