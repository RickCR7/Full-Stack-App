"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 rounded-xl shadow-lg bg-gradient-to-r from-fuchsia-700 via-indigo-600 to-sky-400 mb-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-white font-extrabold text-2xl drop-shadow-lg hover:scale-105 transition-transform"
        prefetch={true}
        onClick={() =>
          showNotification("Welcome to ImageKit ReelsPro", "info")
        }
      >
        <Home className="w-6 h-6" />
        ReelsPro
      </Link>
      <div className="flex items-center gap-4">
        <div className="relative group">
          <button
            tabIndex={0}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition"
          >
            <User className="w-5 h-5" />
            {session ? (
              <span className="hidden sm:inline">{session.user?.email?.split("@")[0]}</span>
            ) : (
              <span className="hidden sm:inline">Account</span>
            )}
          </button>
          <ul className="absolute right-0 mt-2 w-48 bg-white/90 rounded-xl shadow-lg py-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none group-focus-within:pointer-events-auto group-hover:pointer-events-auto transition-opacity z-50">
            {session ? (
              <>
                <li className="px-4 py-1 text-indigo-700 font-bold">
                  {session.user?.email?.split("@")[0]}
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded transition"
                    onClick={() =>
                      showNotification("Welcome to Admin Dashboard", "info")
                    }
                  >
                    Video Upload
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-red-500 hover:bg-red-100 rounded transition w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded transition"
                  onClick={() =>
                    showNotification("Please sign in to continue", "info")
                  }
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}