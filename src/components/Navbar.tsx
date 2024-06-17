'use client'
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/Navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Navbar = ({className,token} : {className ?: string,token:string}) => {
    const [active,setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
        <Menu setActive={setActive}>
            <Link href={"/"}>
                <MenuItem setActive={setActive} active = {active} item="Home"></MenuItem>
            </Link>
            <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-dev">Web Development</HoveredLink>
                <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
            </MenuItem>
            {token ? (
                <>
                    <Link href={'/profile'}>
                        <MenuItem setActive={setActive} active = {active} item="Profile"></MenuItem>
                    </Link>
                    
                </>):(
                <>
                    <Link href={"/signup"}>
                        <MenuItem setActive={setActive} active = {active} item="Signup"></MenuItem>
                    </Link>
                    <Link href={"/login"}>
                        <MenuItem setActive={setActive} active = {active} item="Login"></MenuItem>
                    </Link>
                </>
            )}
        </Menu>
    </div>
  )
}

export default Navbar