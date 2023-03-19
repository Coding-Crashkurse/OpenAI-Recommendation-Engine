import React from "react";

const Register = ({ handleChange, toggleRegister, formValues }) => {
  const handleSubmit = async (e) => {
    console.log(JSON.stringify(formValues));
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4455/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      toggleRegister(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden p-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
          Sign up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="level"
              className="block text-sm font-semibold text-gray-800"
            >
              Level
            </label>
            <select
              name="level"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="mb-2">
            <label
              htmlFor="interests"
              className="block text-sm font-semibold text-gray-800"
            >
              Interests
            </label>
            <input
              name="interests"
              type="text"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an Account?{" "}
          <a
            href="#"
            className="font-medium text-blue-600 hover:underline"
            onClick={() => toggleRegister(false)}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
