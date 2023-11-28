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

            <div className="mb-6">
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
