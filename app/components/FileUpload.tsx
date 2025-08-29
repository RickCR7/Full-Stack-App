"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface ImageKitUploadResponse {
  url: string;
  fileId: string;
  name: string;
  // Add more fields as needed based on ImageKit docs
}

interface FileUploadProps {
  onSuccess: (res: ImageKitUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (fileType === "video" && !file.type.startsWith("video/mp4")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = (await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,

        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      })) as ImageKitUploadResponse;

      onSuccess(res);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        setError("Upload aborted: " + error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        setError("Invalid request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError("Network error: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        setError("Server error: " + error.message);
      } else {
        setError("Upload error: " + String(error));
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="mb-2"
      />
      {uploading && <span>Loading...</span>}
      {error && <span className="text-red-500 block mt-2">{error}</span>}
    </>
  );
};

export default FileUpload;
