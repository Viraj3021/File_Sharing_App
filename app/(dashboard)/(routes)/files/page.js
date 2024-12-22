"use client";
import React, { useEffect, useState } from 'react';
import { db } from "../../../../firebaseConfig"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore"; // If using Firestore

function Files() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State to track the clicked image
  const [selectedIndex, setSelectedIndex] = useState(null); // State to track the index of the selected image

  // Fetch images from Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch from the 'uploadedFiles' collection in Firestore
        const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
        const fileList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Assuming images are stored with a URL in Firestore
        setImages(fileList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading images...</div>;
  }

  // Function to handle image click and open modal
  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setSelectedIndex(index); // Set the index of the clicked image
  };

  // Function to close modal and return to the image gallery
  const closeModal = () => {
    setSelectedImage(null);
    setSelectedIndex(null); // Reset the index when closing the modal
  };

  // Navigate to previous image
  const goToPrevious = () => {
    if (selectedIndex > 0) {
      setSelectedImage(images[selectedIndex - 1].fileUrl);
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Navigate to next image
  const goToNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedImage(images[selectedIndex + 1].fileUrl);
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <div>
      <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl flex justify-center">
       Files 🦑
      </h1>

      <p className="mt-4 leading-relaxed text-gray-900 flex justify-center">
        Files uploaded by users will be displayed here. Click on an image to view it in full size.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={image.fileUrl}
              alt={image.fileName}
              className="w-full h-48 object-cover rounded-md cursor-pointer"
              onClick={() => handleImageClick(image.fileUrl, index)} // Pass index along with image URL
            />
            <h3 className="mt-2 text-xl font-semibold">{image.fileName}</h3>
            <p className="text-sm text-gray-600">Uploaded by: {image.userName}</p>
            <p className="text-sm text-gray-600">File Size: {image.fileSize} KB</p>
          </div>
        ))}
      </div>

      {/* Modal for image zoom view */}
      {selectedImage && (
        <div className="fixed inset-0 bg-gray bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-gray-700 p  -4 rounded-lg max-w-full max-h-full overflow-hidden">
            {/* Close button to exit modal */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black-800 text-5xl"
            >
              &times;
            </button>

            {/* Navigation buttons for previous and next */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black text-5xl"
              disabled={selectedIndex === 0}
            >
              &#60;
            </button>

            <img
              src={selectedImage}
              alt="Zoomed"
              className="max-w-full max-h-[80vh] object-contain"
            />

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black text-5xl"
              disabled={selectedIndex === images.length - 1}
            >
              &#62;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Files;
