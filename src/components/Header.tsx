"use client";
import React, { useState } from "react";

import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
    const [cartCount, setCartCount] = useState(3);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <div className="flex justify-between items-center mt-5 mb-5 gap-5 px-5 md:px-10 z-50">
            <div className="flex justify-start">
                <h1 className="text-3xl text-red-500 font-bold">ST PIZZA</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-center gap-5 text-sm sm:text-base">
                <Link
                    href="/home"
                    className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
                >
                    Home
                </Link>
                <Link
                    href="/menu"
                    className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
                >
                    Menu
                </Link>
                <Link
                    href="/about"
                    className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
                >
                    About
                </Link>
                <Link
                    href="/contact"
                    className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
                >
                    Contact
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-gray-600">
                    {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center md:hidden">
                    <Link
                        href="/home"
                        className="block py-2 text-gray-600 hover:text-red-500"
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link
                        href="/menu"
                        className="block py-2 text-gray-600 hover:text-red-500"
                        onClick={toggleMenu}
                    >
                        Menu
                    </Link>
                    <Link
                        href="/about"
                        className="block py-2 text-gray-600 hover:text-red-500"
                        onClick={toggleMenu}
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="block py-2 text-gray-600 hover:text-red-500"
                        onClick={toggleMenu}
                    >
                        Contact
                    </Link>
                </div>
            )}

            {/* Right Side */}
            <div className="flex items-center gap-5">
                {isLoggedIn ? (
                    <div className="relative">
                        <div
                            className="font-bold text-gray-600 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            Hello, User
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 bg-white shadow-lg rounded-lg p-2 mt-2 w-40">
                                <Link
                                    href="/logout"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="bg-red-500 text-white font-bold py-2.5 px-5 rounded-3xl hidden md:block"
                    >
                        Login
                    </Link>
                )}

                {/* Shopping Cart */}
                <div className="relative cursor-pointer">
                    <ShoppingCart size={30} />
                    {cartCount > 0 && (
                        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
