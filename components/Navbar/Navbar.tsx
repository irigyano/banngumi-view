"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import SearchInput from "./SearchInput";
import Menu from "./Menu";
import ProfileModal from "./ProfileModal";
import LogInButton from "../LogInButton";
import SignUpButton from "../SignUpButton";
import ThemeSwitch from "./ThemeSwitch";
import ThemeModal from "./ThemeModal";
import { BsGithub } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

type NavbarProps = {
  currentUser?: User | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  const [theme, setTheme] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <nav className="flex justify-center lg:justify-between lg:px-20 border-b shadow-md items-center w-full z-20 fixed dark:opacity-60 opacity-80 bg-[#f1f1f1] dark:bg-[#0f0f0f] duration-500">
        <div className="h-10 flex items-center justify-start basis-1/3">
          <div className="hidden lg:block m-1 hover:border-b-2 border-transparent duration-100">
            <Link href={"/home"} className="lg:block">
              <Image alt="logo" src="/images/logo.png" width={40} height={40} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="h-8 w-20 m-1 justify-center items-center flex">
              <Link
                className="hidden lg:block hover:text-blue-500 duration-300"
                href={"/community"}
              >
                社群
              </Link>
            </div>
          </div>
          <div className="h-8 w-20 m-1 justify-center items-center flex">
            <Link
              className="hidden lg:block hover:text-blue-500 duration-300"
              target="_blank"
              href={"https://annict.com/"}
            >
              Annict.com
            </Link>
          </div>
        </div>
        <SearchInput />
        {/* mobile */}
        <Menu currentUser={currentUser} theme={theme} setTheme={setTheme} />
        {/* desktop */}
        <div className="hidden lg:flex basis-1/3 justify-end items-center">
          <Link
            href={"https://github.com/irigyano/Banngumi-View"}
            target="_blank"
            className="hover:text-blue-500 duration-300 h-10 w-10 m-1 flex justify-center items-center"
          >
            <BsGithub size={36} />
          </Link>

          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <div className="h-10 w-10 m-1 flex justify-center items-center">
            <button
              className={`hover:text-blue-500 duration-300 ${
                showThemeModal ? "text-blue-500" : null
              }`}
              onClick={() => {
                setShowThemeModal(!showThemeModal);
              }}
            >
              {theme === "dark" ? (
                <MdOutlineDarkMode size={36} />
              ) : (
                <MdOutlineLightMode size={36} />
              )}
            </button>
            {showThemeModal && (
              <ThemeModal
                theme={theme}
                setTheme={setTheme}
                showThemeModal={showThemeModal}
                setShowThemeModal={setShowThemeModal}
              />
            )}
          </div>

          {currentUser ? (
            <>
              <div className="relative h-10 w-10 m-1 flex justify-center items-center">
                <button
                  onClick={() => {
                    setShowProfileModal(!showProfileModal);
                  }}
                >
                  <Image
                    className="rounded-full"
                    alt="avatar"
                    src="/images/default_avatar.png"
                    width={40}
                    height={40}
                  />
                </button>
                {showProfileModal && (
                  <ProfileModal
                    currentUser={currentUser}
                    showProfileModal={showProfileModal}
                    setShowProfileModal={setShowProfileModal}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="h-10 w-40 flex text-center justify-center items-center">
              <LogInButton />
              <SignUpButton />
            </div>
          )}
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
