"use client";
import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";
import { useRouter } from "next/navigation";
  
export default function Home() {
  const router = useRouter();

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-tr from-fuchsia-700 via-indigo-600 to-sky-400">
      <Header/>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-fuchsia-700 via-indigo-600 to-sky-400 px-4 py-8">
      
        <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-white/30 backdrop-blur-lg p-6 sm:p-10 border border-white/40">
          
          <section className="mt-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              Welcome to ReelsPro
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6">
              Discover, upload, and share amazing reels with the world. Enjoy a seamless experience across all your devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform">
                Explore Videos
              </button>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              onClick={() => router.push('/upload')}
              >
                Upload Your Own
              </button>
            </div>
          </section>
        </div>
        <footer className="mt-8 text-white/70 text-xs text-center">
          &copy; {new Date().getFullYear()} ReelsPro. All rights reserved.
        </footer>
      </main>
      </div>
    </NotificationProvider>
  );
}