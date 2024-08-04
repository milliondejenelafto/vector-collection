import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { fetchAllVectors } from "../services/vectors";
import { useAuth } from "../context/auth-context";

const IndexPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [vectors, setVectors] = useState([]);

  useEffect(() => {
    const loadVectors = async () => {
      try {
        const response = await fetchAllVectors();
        setVectors(response);
      } catch (error) {
        console.error("Error fetching vectors:", error);
      }
    };

    loadVectors();
  }, []);

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
          {vectors.length > 0 ? (
            vectors.map((vector) => (
              <div key={vector._id}>
                <h2>{vector.title}</h2>
                <p>{vector.description}</p>
                {/* Display other vector details */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No vectors available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
