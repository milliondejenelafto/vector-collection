import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const UploadPage = () => {
  const [vectorName, setVectorName] = useState("");
  const [vectorFile, setVectorFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setVectorName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/svg+xml', 'application/postscript', 'application/pdf', 'application/illustrator'];
    if (file && validTypes.includes(file.type)) {
      setVectorFile(file);
      setMessage("");
    } else {
      setVectorFile(null);
      setMessage("Please upload a valid vector file (SVG, AI, EPS, PDF).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vectorName || !vectorFile) {
      setMessage("Please provide both vector name and file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", vectorName);
    formData.append("vector", vectorFile);

    try {
      const response = await fetch("http://localhost:5000/auth/upload-vector", {
        method: "POST",
        body: formData,
        credentials: "include", // Include credentials for authentication
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Vector uploaded successfully!");
        setVectorName("");
        setVectorFile(null);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("There was an error uploading the vector:", error);
      setMessage("Error uploading vector. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Upload Vector</h1>
        <p className="mb-6">Use the form below to upload your vector graphics.</p>
        {message && <div className="mb-4 text-red-500">{message}</div>}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vectorName">
              Vector Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vectorName"
              type="text"
              placeholder="Enter vector name"
              value={vectorName}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vectorFile">
              Upload File
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vectorFile"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UploadPage;

export const Head = () => <title>Upload Vector</title>;
