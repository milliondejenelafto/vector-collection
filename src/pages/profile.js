import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    // Fetch user data from local storage
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user')); // Replace with server fetch if needed
        if (userData) {
          setName(userData.displayName || "");
          setEmail(userData.email || "");
          setImage(userData.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Profile</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Your profile information from Google.</p>
        
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto text-center">
          <img src={image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <p className="text-gray-700">{name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <p className="text-gray-700">{email}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const Head = () => <title>Profile</title>;
