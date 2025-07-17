import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion'; // Import Variants type
import { FaUserPlus, FaLock } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://studyhelper-be-1.onrender.com'
  : 'http://localhost:5000';


const SignUpPage: React.FC = () => {

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [username, setUserName] = useState("")
  const navigate = useNavigate()
  // // Handles the form submission
  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // In a real application, you would send this data to your backend for user registration.
  //   // For now, we'll just log it to the console.

  //   if (password !== confirmPassword) {
  //     // In a real application, replace this with a custom modal or inline error message.
  //     // Using console.error for demonstration.
  //     console.error("Passwords do not match!");
  //     return;
  //   }
  //   // Add your actual sign-up logic here (e.g., API call, user creation service)
  // };

  // Framer Motion variants for the main form container
  const formVariants: Variants = { // Explicitly type as Variants
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut", // Changed to string literal for compatibility
        when: 'beforeChildren', // Animate parent before children
        staggerChildren: 0.1,   // Stagger animation for child elements
      },
    },
  };
  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      console.log("test3")
      const response = await fetch(`${API_URL}/api/authRoutes/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username,  password }),
      });

      console.log("test2")

      const data = await response.json();

      console.log("Response OK:", response.ok);
      console.log("Response Data:", data);
      console.log(message)
      if (response.ok) {

        setMessage("Signup successful!");
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  // Framer Motion variants for input fields
  const inputVariants: Variants = { // Explicitly type as Variants
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Framer Motion variants for buttons, including hover and tap effects
  const buttonVariants: Variants = { // Explicitly type as Variants
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }, // Changed to string literal for compatibility
    hover: { scale: 1.03, boxShadow: '0 8px 20px rgba(124, 58, 237, 0.4)' }, // Scale up and add shadow on hover
    tap: { scale: 0.97 }, // Slightly shrink on tap for feedback
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <motion.div
        className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8">
          {/* Sign Up icon */}
          <FaUserPlus className="text-6xl text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600 mt-2">Join NoteGenius and unlock smart note-taking!</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email input field */}
          <motion.div variants={inputVariants}>
            <label  className="block text-gray-700 text-sm font-medium mb-2">User Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="User Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
                required
              />
            </div>
          </motion.div>
       


          {/* Password input field */}
          <motion.div variants={inputVariants}>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required
              />
            </div>
          </motion.div>



          {/* Sign Up button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Already have an account link */}
        <motion.p
          className="text-center text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
        >
          Already have an account?{' '}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200 cursor-pointer"
          >
            Log In
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
