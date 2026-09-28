import { useState, useEffect } from "react";

export default function ProductGallery({ images = [] }) {
  const validImages = images.filter(Boolean);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (validImages.length > 0) {
      setSelectedImage(validImages[0]);
    } else {
      setSelectedImage("");
    }
  }, [images]);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-125 bg-gray-200 rounded-2xl flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-125 object-cover rounded-2xl shadow"
        />
      )}

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {validImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 transition ${
              selectedImage === image
                ? "border-emerald-600"
                : "border-gray-200 hover:border-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}