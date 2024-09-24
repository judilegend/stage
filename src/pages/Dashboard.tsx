import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../store/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h1 className="text-2xl mb-4">Welcome to Dashboard!</h1>
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
