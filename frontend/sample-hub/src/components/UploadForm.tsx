"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    try {
      if (!file) {
        setMessage("Please select a file first.");
        return;
      }

      setUploading(true);
      setMessage("Uploading...");

      // inside handleUpload()
      const filePath = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("samples")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("samples")
        .getPublicUrl(filePath);
      const fileUrl = publicData.publicUrl;

      const { error: dbError } = await supabase
        .from("samples")
        .insert([{ title: file.name, file_url: fileUrl }]);
      if (dbError) throw dbError;

      setMessage("✅ Upload successful!");
      setFile(null);
    } catch (err: any) {
      setMessage(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Sample</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 w-full py-2 px-4 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
