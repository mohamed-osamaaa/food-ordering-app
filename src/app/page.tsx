import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import pizza from "../../public/pizza.png";

const HomePage = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    return (
        <div className="mx-32">
            <div className="flex justify-center items-center">
                <div className="flex flex-col gap-10 mr-24">
                    <p className="text-5xl font-bold w-75">
                        Everything is better with a{" "}
                        <span className="text-red-500">Pizza</span>
                    </p>
                    <p className="text-gray-600 w-75">
                        Pizza is the missing piece that makes every day
                        complete, a simple yet delicious joy in life
                    </p>
                    <div className="flex justify-center items-center flex-row gap-5">
                        <Link
                            href="/menu"
                            className="flex justify-center items-center gap-5 px-6 py-3 rounded-3xl bg-red-600 hover:text-red-700 shadow-md cursor-pointer"
                        >
                            <p className="text-white">ORDER NOW</p>
                            <CircleArrowRight className="text-white" />
                        </Link>
                        <Link
                            href="/about"
                            className="flex justify-center items-center gap-5 px-6 py-3 rounded-3xl bg-white hover:border-gray-600 shadow-md cursor-pointer"
                        >
                            <p className="text-gray-600">LEARN MORE</p>
                            <CircleArrowRight className="text-gray-600" />
                        </Link>
                    </div>
                </div>
                <div className="ml-24">
                    <Image
                        src={pizza}
                        alt="pizza"
                        className="w-[600px] h-[600px]"
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default HomePage;
