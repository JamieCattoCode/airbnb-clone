import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  console.log('Login');
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-lg mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="Password" />
          <button type="submit" className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?
            {' '}
            <Link className="underline text-black" to="/register">Register now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;