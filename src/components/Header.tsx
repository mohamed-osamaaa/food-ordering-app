// "use client";
// import React, { useEffect, useState } from "react";

// import { jwtDecode } from "jwt-decode";
// import { Menu, ShoppingCart, User, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Header = () => {
//     const [cartCount, setCartCount] = useState(4);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userRole, setUserRole] = useState<"USER" | "ADMIN" | null>(null);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const router = useRouter();

//     const toggleMenu = () => setIsMenuOpen((prev) => !prev);

//     const checkAuthFromCookies = () => {
//         const cookies = document.cookie.split("; ");
//         const jwtCookie = cookies.find((cookie) =>
//             cookie.startsWith("jwtToken=")
//         );
//         console.log(jwtCookie);
//         if (jwtCookie) {
//             const token = jwtCookie.split("=")[1];

//             try {
//                 const decoded: any = jwtDecode(token);
//                 setUserRole(decoded.role);
//                 setIsLoggedIn(true);
//             } catch (err) {
//                 console.error("Invalid token", err);
//             }
//         }
//     };
//     // const checkAuthFromLocalStorage = () => {
//     //     const userRole = localStorage.getItem("role");

//     //     if (userRole) {
//     //         setUserRole(userRole);
//     //         setIsLoggedIn(true);
//     //         console.log("User role from localStorage:", userRole);
//     //     } else {
//     //         console.log("No user role found in localStorage.");
//     //     }
//     // };

//     const handleProfileClick = () => {
//         if (userRole === "ADMIN") {
//             router.push("/admin");
//         } else {
//             router.push("/profile");
//         }
//     };

//     useEffect(() => {
//         checkAuthFromCookies();
//         // checkAuthFromLocalStorage();
//     }, []);

//     return (
//         <div className="flex justify-between items-center mt-5 mb-5 md:gap-5 px-5 lg:px-16 z-50">
//             <div className="flex justify-start">
//                 <h1 className="text-red-500 font-bold text-xl lg:text-3xl">
//                     ST PIZZA
//                 </h1>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex justify-center gap-5 text-sm sm:text-base">
//                 <Link
//                     href="/"
//                     className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
//                 >
//                     Home
//                 </Link>
//                 <Link
//                     href="/menu"
//                     className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
//                 >
//                     Menu
//                 </Link>
//                 <Link
//                     href="/about"
//                     className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
//                 >
//                     About
//                 </Link>
//                 <Link
//                     href="/contact"
//                     className="font-bold text-gray-600 mx-5 hover:text-red-500 transition"
//                 >
//                     Contact
//                 </Link>
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center gap-7">
//                 {isLoggedIn ? (
//                     <div
//                         onClick={handleProfileClick}
//                         className="text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl flex items-center justify-center bg-gray-700 cursor-pointer"
//                     >
//                         <User className="w-5 h-5" />
//                     </div>
//                 ) : (
//                     <Link
//                         href="/register"
//                         className="bg-red-500 text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl"
//                     >
//                         Register
//                     </Link>
//                 )}

//                 {/* Shopping Cart */}
//                 <div className="relative cursor-pointer">
//                     <ShoppingCart className="size-6 md:size-7" />
//                     {cartCount > 0 && (
//                         <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                             {cartCount}
//                         </div>
//                     )}
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="md:hidden flex items-center">
//                     <button onClick={toggleMenu} className="text-gray-600">
//                         {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;

"use client";
import React, { useEffect, useState } from "react";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const [cartCount, setCartCount] = useState(4);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const router = useRouter();
    // const checkAuthFromCookies = () => {
    //     const cookies = document.cookie.split("; ");
    //     const jwtCookie = cookies.find((cookie) =>
    //         cookie.startsWith("jwtToken=")
    //     );
    //     console.log(jwtCookie);
    //     if (jwtCookie) {
    //         const token = jwtCookie.split("=")[1];

    //         try {
    //             const decoded: any = jwtDecode(token);
    //             setUserRole(decoded.role);
    //             setIsLoggedIn(true);
    //         } catch (err) {
    //             console.error("Invalid token", err);
    //         }
    //     }
    // };
    const checkAuthFromLocalStorage = () => {
        const login = localStorage.getItem("isLogin");
        console.log("Raw isLogin from localStorage:", login);

        if (login === "true") {
            setIsLoggedIn(true);
        } else {
            console.log(
                "User is not logged in or 'isLogin' not found in localStorage."
            );
            setIsLoggedIn(false);
        }
    };

    const handleProfileClick = () => {
        router.push("/profile");
    };

    useEffect(() => {
        // checkAuthFromCookies();
        checkAuthFromLocalStorage();
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
                    <div
                        onClick={handleProfileClick}
                        className="text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl flex items-center justify-center bg-gray-700 cursor-pointer"
                    >
                        <User className="w-5 h-5" />
                    </div>
                ) : (
                    <Link
                        href="/register"
                        className="bg-red-500 text-white md:font-bold py-1 px-2 md:py-2.5 md:px-5 rounded-3xl"
                    >
                        Register
                    </Link>
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
            </div>
        </div>
    );
};

export default Header;
