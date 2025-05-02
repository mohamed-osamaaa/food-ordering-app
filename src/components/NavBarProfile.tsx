"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

type NavBarProfileProps = {
    defaultTab?: string;
};

function NavBarProfile({ defaultTab = "Profile" }: NavBarProfileProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);
    const router = useRouter();

    const tabs = ["Profile", "Category", "Menu Items", "Users", "Orders"];

    const handleClick = (tab: string) => {
        setActiveTab(tab);
        const path =
            tab === "Profile"
                ? "/profile"
                : `/profile/${tab.toLowerCase().replace(/\s+/g, "-")}`;
        router.push(path);
    };

    return (
        <div className="flex justify-center gap-5 mt-[50px]">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleClick(tab)}
                    className={`cursor-pointer rounded-2xl px-4 py-2 text-white transition-colors duration-300 ${
                        activeTab === tab ? "bg-red-500" : "bg-gray-500"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default NavBarProfile;
