import React from 'react';

function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold leading-none tracking-normal text-gray-900">
          Welcome to 480 Flight Assistance
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          Sign up or log in to explore our flight services and assistance.
        </p>
      </div>
    </section>
  );
}

export default Home;
