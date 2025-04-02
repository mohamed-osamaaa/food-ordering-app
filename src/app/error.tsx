"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    return (
        <div className="fix-height flex flex-col items-center justify-center pt-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-4 rounded-lg w-[90%] max-w-md shadow-lg"
            >
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <h1 className="text-2xl font-semibold">Something went wrong</h1>
                <p className="text-gray-700 mt-2">{error.message}</p>
            </motion.div>

            <motion.button
                onClick={reset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all"
            >
                Try Again
            </motion.button>

            <Link
                href="/"
                className="mt-4 text-lg text-blue-600 hover:text-blue-800 underline transition-all"
            >
                Go to Home Page
            </Link>
        </div>
    );
};

export default ErrorPage;
