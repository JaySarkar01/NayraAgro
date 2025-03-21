"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [navbarTop, setNavbarTop] = useState("top-[32px]"); // Track Green Navbar Position
  const menuRef = useRef(null);
  let lastScrollY = 0;

  // Hide/Show Yellow Navbar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Green Navbar Position Smoothly
  useEffect(() => {
    setNavbarTop(showTopBar ? "top-[32px]" : "top-0");
  }, [showTopBar]);

  // Close Sidebar When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative z-50">
      {/* 🔹 Top Yellow Bar */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#FFD700] p-2 transition-transform duration-500 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        } z-50`}
      >
        <div className="flex justify-between items-center text-black text-sm px-4">
          {/* Contact Info */}
          <div className="hidden md:flex gap-4">
            <p className="flex gap-2 items-center">
              <FaMapMarkerAlt /> Dineshpur, 263160
            </p>
            <p className="flex gap-2 items-center">
              <FaEnvelope /> info@email.com
            </p>
            <p className="flex gap-2 items-center">
              <FaPhone /> +91 9876556677
            </p>
            <p className="flex gap-2 items-center">
              <FaClock /> Mon-Sat: 09.30 to 06.00
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 text-xl">
            {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, index) => (
              <Icon
                key={index}
                className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-gray-700"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Main Green Navbar */}
      <div
        className={`fixed ${navbarTop} left-0 w-full bg-[#1a7b1a] p-4 flex justify-between items-center z-50 transition-all duration-500`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-white text-4xl font-semibold">nyra.</span>
          <span className="text-[#FFD700] text-3xl font-mono">Agro</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {["Home", "About Us", "Services", "Contact Us"].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-white text-lg font-medium hover:text-yellow-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔹 Mobile Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-2/3 h-full bg-[#1a7b1a] text-white transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-[100]`}
      >
        <button
          className="absolute top-4 right-4 text-3xl"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <div className="flex flex-col mt-20 gap-6 p-6">
          {/* Navigation Links Section */}
          <div className="flex flex-col gap-6">
            {["Home", "About Us", "Services", "Contact Us"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-xl font-medium hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-60 gap-4">
            <p className="flex gap-2 items-center">
              <FaMapMarkerAlt /> Dineshpur, 263160
            </p>
            <p className="flex gap-2 items-center">
              <FaEnvelope /> info@email.com
            </p>
            <p className="flex gap-2 items-center">
              <FaPhone /> +91 9876556677
            </p>
            <p className="flex gap-2 items-center">
              <FaClock /> Mon-Sat: 09.30 to 06.00
            </p>
          </div>
        </div>
      </div>

      {/* Push Content Below Navbar */}
      <div className="mt-[70px] md:mt-[80px]"></div>
    </div>
  );
}
