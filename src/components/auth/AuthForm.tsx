import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
    {...props}
  />
);

const FormLabel = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
);

const FormMessage = ({ message }) => (
  message ? <p className="text-sm text-red-500 mt-1">{message}</p> : null
);

const Select = ({ value, onChange, children }) => (
  <select 
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
  >
    {children}
  </select>
);

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (mode === 'signup') {
      if (!formData.full_name || formData.full_name.length < 2) {
        newErrors.full_name = 'Name must be at least 2 characters';
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <FormLabel>Full Name</FormLabel>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              name="full_name"
              placeholder="John Doe"
              className="pl-10"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <FormMessage message={errors.full_name} />
        </div>
      )}

      <div>
        <FormLabel>Email</FormLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            name="email"
            placeholder="you@example.com"
            className="pl-10"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <FormMessage message={errors.email} />
      </div>

      <div>
        <FormLabel>Password</FormLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            name="password"
            type="password"
            className="pl-10"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <FormMessage message={errors.password} />
      </div>

      {mode === "signup" && (
        <div>
          <FormLabel>I am a</FormLabel>
          <Select
            value={formData.role}
            onChange={(e) => handleChange({ target: { name: 'role', value: e.target.value } })}
          >
            <option value="buyer">Buyer</option>
            <option value="miner">Miner</option>
          </Select>
          <FormMessage message={errors.role} />
        </div>
      )}

      <button
        type="submit"
        className="w-full h-11 bg-[#F2E2E2] hover:bg-red-100 rounded-md transition-colors"
      >
        {mode === "login" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
};

export default AuthForm;
