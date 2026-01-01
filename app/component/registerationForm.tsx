"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../utils/apiFunction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";


type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(formData);

      toast.success("Registration Successful!!");

      console.log("API Response:", res);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

    } catch (error: any) {
      toast.error(error.message || "Registration failed ");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-row  font-sans  text-white  w-full ">
        {/* left side */}
        <div className=" hidden lg:block w-1/2 h-screen" >
        <img src="/reg.jpg"
        alt="image"
        className="w-full h-full object-cover"
        />
        </div>

        
        <form
          className="bg-blue-700 p-8 rounded-xl shadow-md  min-h-screen flex flex-col gap-7 items-center justify-center w-full lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-4xl ">Registration Form</h2>

          <div className="flex flex-row gap-10">
            <label>Name:</label> 
            <input
              className="outline-1 rounded-md p-1"
              placeholder="eg.Joey"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-row gap-10">
            <label>Email:</label>
            <input
              className="outline-1 rounded-md p-1"
              placeholder="eg.joey@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-row gap-2">
            <label>Password:</label>
            <input
              className="outline-1 rounded-md p-1"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-row gap-8">
            <label>Phone:</label>
            <input
              className="outline-1 rounded-md p-1"
              placeholder="Phone no."
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="text-xl cursor-pointer bg-white font-bold text-blue-700 w-40 rounded-md p-1"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default RegistrationForm;
