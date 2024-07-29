// src/pages/UploadPage.js
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import cloudinary from "../cloudinaryConfig";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const API_URL = 'http://localhost:5000';

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [privateImageUrl, setPrivateImageUrl] = useState("");
  const [cloudName] = useState("dt93lij1r"); // Enter your cloud name
  const [uploadPreset] = useState("ml_default"); // Enter your upload preset
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    resourceType: "auto", // Automatically determines the file type
    clientAllowedFormats: ["svg", "blend"], // Allow only SVG and Blender files
  });

  const myImage = cloudinary.image(publicId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          title: imageName,
          description: imageDescription,
          fileUrl: privateImageUrl, // Sending secure_url to backend
          fileName: publicId, // Optional: sending publicId as fileName
          // Other fields as required
        }),
      });
      if (response.ok) {
        console.log('Image data saved successfully');
      } else {
        throw new Error('Failed to save image data');
      }
    } catch (error) {
      console.error('Error saving image data:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageName">
              Image Name
            </label>
            <input
              type="text"
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageDescription">
              Image Description
            </label>
            <textarea
              id="imageDescription"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              setPrivateImageUrl={setPrivateImageUrl} // Correctly pass setPrivateImageUrl as a prop
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save Image Data
          </button>
        </form>
        {publicId && (
          <div style={{ width: "800px" }}>
            <AdvancedImage
              style={{ maxWidth: "100%" }}
              cldImg={myImage}
              plugins={[responsive(), placeholder()]}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UploadPage;

export const Head = () => <title>Upload Image</title>;
