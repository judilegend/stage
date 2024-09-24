import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import { register, login } from "./services/authService";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setToken(response.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {token ? (
          <div>
            <h1 className="text-2xl mb-4">Welcome!</h1>
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* <h1 className="text-2xl mb-4">Register</h1>
            <AuthForm onSubmit={handleRegister} buttonText="Register" /> */}
            <h1 className="text-2xl my-4">Login</h1>
            <AuthForm onSubmit={handleLogin} buttonText="Login" />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
