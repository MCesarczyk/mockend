"use client";

import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = e.target.files[0];
      const { data: image, error: uploadError } = await supabase.storage
        .from("mockend-storage")
        .upload(`${file.name}`, file);
      if (uploadError) {
        throw uploadError;
      }

      if (image) {
        console.log(image);
      }

      const { data: imgUrl } = await supabase.storage
        .from("mockend-storage")
        .getPublicUrl(file.name ?? "default");
      if (imgUrl) {
        setImageUrl(imgUrl.publicUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold">NextJs & Supabase Storage</h1>
        <div className="mt-5">
          <input
            type="file"
            onChange={uploadImage}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 py-2 px-8"
          />
        </div>
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={400}
              height={400}
              className="rounded-lg border border-gray-300"
            />
          )}
        </div>
      </main>
    </div>
  );
}
