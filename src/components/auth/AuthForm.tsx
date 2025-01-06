import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

const AuthForm = ({ mode = 'login' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'buyer'
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    
    // Name validation (only for signup)
    if (mode === 'signup' && formData.full_name.length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="full_name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
              value={formData.full_name}
              onChange={handleInputChange}
            />
          </div>
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name}</p>
          )}
        </div>
      )}
      
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            name="password"
            type="password"
            className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      
      {mode === "signup" && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            I am a
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-gray-500 focus:outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="miner">Miner</option>
          </select>
        </div>
      )}
      
      <button
        type="submit"
        className="w-full h-11 bg-[#F2E2E2] hover:bg-[#F2E2E2]/90 rounded-md font-medium"
      >
        {mode === "login" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
};

export default AuthForm;
