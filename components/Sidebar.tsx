"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
    children?: React.ReactNode;
    params?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname === '/',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ], [pathname]);

    return (
        <div className="h-full flex">
            <div className="md:flex flex-col gap-y-2 h-full bg-black p-2 w-[300px] hidden">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="h-full overflow-y-auto">
                    <Library />
                </Box>
            </div>
            <div className="h-full flex-1 overflow-y-auto py-2">{children}</div>
        </div>
    );
}

export default Sidebar;


