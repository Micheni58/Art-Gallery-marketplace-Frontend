import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Uploads() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // Added price state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !price) {
      alert("Please provide an image, title, and price!");
      return;
    }

    // Step 1: Upload the file to /upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadData = await uploadRes.json();
      const image_url = uploadData.image_url;

      // Step 2: Create artwork in /artworks
      const artist_id = 1; // Replace with actual artist_id (e.g., from localStorage or user context)
      const artworkData = {
        title,
        description,
        price: parseFloat(price), // Ensure price is a number
        artist_id,
        image_url,
      };

      const artworkRes = await fetch("http://127.0.0.1:5000/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artworkData),
      });

      if (artworkRes.ok) {
        alert("Artwork uploaded and recorded successfully!");
        setFile(null);
        setTitle("");
        setDescription("");
        setPrice("");
        navigate("/artworks"); // Redirect to artworks page
      } else {
        const errorData = await artworkRes.json();
        alert(`Failed to record artwork: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6">
      <div className="p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-bold text-2xl text-gray-800">Upload Artwork</h1>
          <p className="text-gray-600">
            Share your creativity with the Artisan Community!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="font-bold text-gray-700">Artwork Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 mt-1 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter artwork title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700">Description</label>
            <textarea
              placeholder="Describe your artwork, inspiration, techniques used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 px-3 py-2 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-10 px-3 mt-1 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-purple-400 transition active:ring-2 ring-purple-500"
          >
            Upload Artwork
          </button>
        </form>
      </div>
    </div>
  );
}

export default Uploads;