import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const handleSignup = () => {
    if (!username || !email || !password) {
      setError("Please fill all fields.");
      setSuccess("");
      return;
    }

    const users = getUsers();
    if (users.find((user) => user.email === email)) {
      setError("Email already exists.");
      setSuccess("");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("Successfully registered! You can now log in.");

    setTimeout(() => {
      setIsLogin(true);
      setSuccess("");
    }, 1000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid credentials.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 w-full max-w-md shadow-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div className="space-y-6">
          {!isLogin && (
            <div className="flex items-center gap-4 border border-white/20 rounded-full px-4 py-3 focus-within:border-cyan-400 transition-all duration-300">
              <FaUser className="text-white w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              />
            </div>
          )}

          <div className="flex items-center gap-4 border border-white/20 rounded-full px-4 py-3 focus-within:border-purple-400 transition-all duration-300">
            <FaEnvelope className="text-white w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-4 border border-white/20 rounded-full px-4 py-3 focus-within:border-purple-400 transition-all duration-300">
            <FaLock className="text-white w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center animate-fadeIn">{error}</p>}

          {success && <p className="text-green-400 text-sm text-center animate-fadeIn">{success}</p>}

          <button
            onClick={isLogin ? handleLogin : handleSignup}
            className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <p className="text-gray-400 text-center mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); setUsername(""); setEmail(""); setPassword(""); setSuccess(""); }}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
      `}</style>
    </div>
  );
};

export default AuthPage;
