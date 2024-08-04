import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { fetchUserVectors, fetchUserProfile } from "../services/vectors";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userVectors, setUserVectors] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserProfile();
        if (userData) {
          setName(userData.displayName || "");
          setEmail(userData.email || "");
          setImage(userData.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    // Fetch user-uploaded vectors from the backend
    const loadUserVectors = async () => {
      try {
        const data = await fetchUserVectors();
        setUserVectors(data);
      } catch (error) {
        console.error("Error fetching user vectors:", error);
      }
    };

    fetchUserData();
    loadUserVectors();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-4 text-center">Profile</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Your profile information from Google.</p>
        
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto text-center">
          <img src={image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <p id="name" className="text-gray-700">{name}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <p id="email" className="text-gray-700">{email}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Uploaded Images</h2>
          {userVectors.length > 0 ? (
            userVectors.map((vector) => (
              <div key={vector._id} className="mb-4">
                <img src={vector.fileUrl} alt={vector.title} className="w-full h-48 object-cover mb-2" /> {/* Adjusted image size */}
                <p className="text-gray-700 font-bold">{vector.title}</p>
                <p className="text-gray-700">{vector.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">No uploaded images found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const Head = () => <title>Profile</title>;
