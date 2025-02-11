import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-600">
      <div className="max-w-6xl flex items-center justify-between p-2">
        <h1 className="font-bold text-lg">{"Vansh MERN Stack"}</h1>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
