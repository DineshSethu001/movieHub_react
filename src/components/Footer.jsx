import React, { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
   <footer className="bg-[#7B542F] text-white py-10 mt-auto">
  <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-10">

    {/* Logo / Brand */}
    <div>
      <h1 className="text-3xl font-bold tracking-wide">MovieHub</h1>
      <p className="text-sm mt-2 text-[#FFF1CB]">Bringing style to your home</p>
    </div>

    {/* Links */}
    <div className="flex flex-col md:flex-row gap-10">
      <div>
        <h2 className="font-semibold text-lg mb-3 border-b border-[#FFF1CB]/30 pb-1">Company</h2>
        <ul className="text-sm space-y-1">
          <li className="hover:text-[#FFF1CB] cursor-pointer transition">About Us</li>
        </ul>
        <p className="mt-3 text-sm text-[#FFF1CB]/90 leading-relaxed max-w-sm">
          We are passionate about connecting people with the latest and greatest in entertainment.
          Our website provides up-to-date movie information, ratings, and reviews to help users
          discover and enjoy the best films across all genres.
        </p>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-10 border-t border-white/30 pt-4 text-center text-sm text-[#FFF1CB]/80">
    &copy; {new Date().getFullYear()} MovieHub. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
