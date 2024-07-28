import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { localLogin, googleLogin } from '../services/auth';
import { useAuth } from '../context/auth-context';
import { navigate } from 'gatsby';

//=========================
// AuthPage Component
//=========================
const AuthPage = ({ isSignUp, setIsSignUp }) => {
  const { setIsAuthenticated, setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      //=========================
      // Sign-up Logic
      //=========================
      try {
        const response = await fetch('http://localhost:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, displayName }),
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUser(userData);
          navigate('/');
        } else {
          setError('Failed to sign up.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to sign up.');
      }
    } else {
      //=========================
      // Sign-in Logic
      //=========================
      try {
        const user = await localLogin(email, password);
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
          navigate('/');
        } else {
          setError('Failed to sign in.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to sign in.');
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <p className="mb-6">{isSignUp ? 'Create your account.' : 'Please sign in to access your account.'}</p>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleAuth}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          {isSignUp && (
            //=========================
            // Display Name for Sign-up
            //=========================
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                type="text"
                placeholder="Enter your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className={`bg-${isSignUp ? 'green' : 'blue'}-500 hover:bg-${isSignUp ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            {!isSignUp && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={googleLogin}
              >
                Sign In with Google
              </button>
            )}
          </div>
        </form>
        <div className="text-center">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              setError('');
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

//=========================
// AuthPageWithHead Component
//=========================
const AuthPageWithHead = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <title>{isSignUp ? 'Sign Up' : 'Sign In'}</title>
      <AuthPage isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </>
  );
};

export default AuthPageWithHead;
