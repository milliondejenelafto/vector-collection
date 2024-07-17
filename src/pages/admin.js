import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log("Search parameters:", { searchTerm, category, startDate, endDate });
  };

  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Admin Panel</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Manage and search through vector graphics.</p>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchTerm">
              Search
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchTerm"
              type="text"
              placeholder="Search for vectors..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              <option value="cultural">Cultural</option>
              <option value="modern">Modern</option>
              <option value="abstract">Abstract</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        <div className="text-center">
          {/* Here you would map through the filtered vector graphics and display them */}
          <p className="text-gray-500">Search results for: <span className="font-bold">{searchTerm}</span></p>
          <p className="text-gray-500">Category: <span className="font-bold">{category}</span></p>
          <p className="text-gray-500">Date Range: <span className="font-bold">{startDate}</span> to <span className="font-bold">{endDate}</span></p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;

export const Head = () => <title>Admin Panel</title>;
