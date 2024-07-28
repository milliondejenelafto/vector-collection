import React from 'react';
import { AuthProvider } from './src/context/auth-context';
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    {element}
  </AuthProvider>
);
