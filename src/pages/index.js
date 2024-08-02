import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";

const IndexPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vectors, setVectors] = useState([]);
  const [filteredVectors, setFilteredVectors] = useState([]);

  useEffect(() => {
    // Fetch all vectors from the backend
    const fetchVectors = async () => {
      try {
        const response = await fetch('https://vector-collection-backend.vercel.app/auth/all-vectors', {
          credentials: 'include',
        } );
        if (response.ok) {
          const data = await response.json();
          setVectors(data);
          setFilteredVectors(data);
        } else {
          throw new Error('Failed to fetch vectors');
        }
      } catch (error) {
        console.error("Error fetching vectors:", error);
      }
    };

    fetchVectors();
  }, []);

  useEffect(() => {
    // Filter vectors based on search term
    const results = vectors.filter(vector =>
      vector.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vector.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVectors(results);
  }, [searchTerm, vectors]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Vector Collection</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Discover and share cultural vector graphics.</p>
        
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for vectors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="shadow appearance-none border rounded-l w-full max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors duration-300"
          >
            Search
          </button>
        </div>

        <div className="flex justify-center mb-6 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            All
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Popular
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            New
          </button>
          <a
            href="/upload"
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            Upload
          </a>
        </div>

        <div className="text-center">
          <p className="text-gray-500">Search results for: <span className="font-bold">{searchTerm}</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVectors.map(vector => (
              <div key={vector._id} className="bg-white shadow-md rounded p-4">
                <img src={vector.fileUrl} alt={vector.title} className="w-full h-48 object-cover mb-2" /> {/* Adjusted image size */}
                <h2 className="text-lg font-bold">{vector.title}</h2>
                <p className="text-gray-700">{vector.description}</p>
                <p className="text-gray-500 text-sm">Uploaded by: {vector.userId.displayName}</p> {/* Display uploader's name */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
