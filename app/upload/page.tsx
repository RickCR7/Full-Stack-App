"use client";
import { NotificationProvider } from "../components/Notification";
import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <NotificationProvider>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-fuchsia-700 via-indigo-600 to-sky-400 px-4 py-8">
        <VideoUploadForm />
      </div>
    </NotificationProvider>
  );
}
