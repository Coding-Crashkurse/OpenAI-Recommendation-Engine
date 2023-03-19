import React from "react";

const SignIn = ({ handleLogin, toggleRegister, loginValues, toggleLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginValues);
    const formData = new URLSearchParams();
    formData.append("username", loginValues.email);
    formData.append("password", loginValues.password);

    console.log(formData);
    try {
      const response = await fetch("http://localhost:4455/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      toggleLogin(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden p-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={handleLogin}
              name="email"
              type="email"
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
              onChange={handleLogin}
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-600 hover:underline"
            onClick={() => toggleRegister(true)}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
