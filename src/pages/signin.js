import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { localLogin, googleLogin } from "../services/auth";
//
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const [publicId, setPublicId] = useState("");
  // enter cloud name
  const [cloudName] = useState("");
  // enter preset
  const [uploadPreset] = useState("");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await localLogin(email, password);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <p className="mb-6">Please sign in to access your account.</p>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={googleLogin}
            >
              Sign In with Google
            </button>
          </div>
        </form>
        <div className="App">
          <h3>Cloudinary Upload Widget Example</h3>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
          />
          <p>
            <a
              href="https://cloudinary.com/documentation/upload_widget"
              target="_blank"
            >
              Upload Widget User Guide
            </a>
          </p>
          <div style={{ width: "800px" }}>
            <AdvancedImage
              style={{ maxWidth: "100%" }}
              cldImg={myImage}
              plugins={[responsive(), placeholder()]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;

export const Head = () => <title>Sign In</title>;
