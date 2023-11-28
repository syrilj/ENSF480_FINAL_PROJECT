import React from 'react';

function Signup() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize dark:text-white lg:text-4xl">
          Sign Up for 480 Flight Assistance
        </h1>

        <div className="mt-8 w-full max-w-md mx-auto">
          <form className="px-8 py-10 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:shadow-black/50">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm text-black dark:text-black">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm text-black dark:text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="johndoe123"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-black dark:text-black">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm text-black dark:text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm text-black dark:text-black">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 Main St, City, Country"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block mb-2 text-sm text-black dark:text-black">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                placeholder="(555) 123-4567"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-sm text-black dark:text-black">
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:text-black-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
