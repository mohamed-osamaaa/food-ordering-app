"use client";
import React, { useEffect, useState } from "react";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
    const [cartCount, setCartCount] = useState(4);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    // Function to check the authentication cookie
    const checkAuthFromCookies = () => {
        const cookies = document.cookie.split("; ");
        const sessionCookie = cookies.find((cookie) =>
            cookie.startsWith("jwtToken=")
        );

        if (sessionCookie) {
            // const sessionData = sessionCookie.split("=")[1];
            setIsLoggedIn(true);
            // setCartCount(userData.cartCount || 0);
        }
    };

    useEffect(() => {
        checkAuthFromCookies();
    }, []);

    return (
        <div className="flex justify-between items-center mt-5 mb-5 md:gap-5 px-5 lg:px-16 z-50">
            <div className="flex justify-start">
                <h1 className="text-red-500 font-bold text-xl lg:text-3xl">
                    ST PIZZA
                </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-center gap-5 text-sm sm:text-base">
                <Link
                    href="/"
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

            {/* Right Side */}
            <div className="flex items-center gap-7">
                {isLoggedIn ? (
                    <Link
                        href="/register"
                        className="bg-red-500 text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl"
                    >
                        Register
                    </Link>
                ) : (
                    <div className="text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl flex items-center justify-center bg-gray-700 cursor-pointer">
                        <User className="w-5 h-5" />
                    </div>
                )}
                {/* Shopping Cart */}
                <div className="relative cursor-pointer">
                    <ShoppingCart className="size-6 md:size-7" />
                    {cartCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {cartCount}
                        </div>
                    )}
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-gray-600">
                        {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`absolute top-16 right-0 w-56 py-5 bg-white shadow-2xl z-40 flex flex-col items-start pl-4 md:hidden transition-all duration-500 ease-in-out transform ${
                        isMenuOpen
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-5 pointer-events-none"
                    }`}
                >
                    <Link
                        href="/"
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
            </div>
        </div>
    );
};

export default Header;
