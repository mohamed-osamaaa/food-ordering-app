import { motion } from "framer-motion";

const Loading = () => {
    return (
        <section className="fix-height p-5 flex items-center justify-center">
            <motion.div
                className="relative w-16 h-16 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute w-full h-full border-4 border-red-500 border-t-orange-400 rounded-full animate-spin"></div>
                <div className="absolute w-12 h-12 border-4 border-red-500 border-t-orange-400 rounded-full animate-[spin_2s_linear_infinite]"></div>
                <div className="absolute w-8 h-8 border-4 border-red-500 border-t-orange-400 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
            </motion.div>
        </section>
    );
};

export default Loading;
