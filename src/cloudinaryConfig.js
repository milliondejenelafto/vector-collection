// src/cloudinaryConfig.js
import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dt93lij1r', // Replace with your Cloudinary cloud name
  },
  url: {
    secure: true, // Use HTTPS
  },
});

export default cloudinary;
