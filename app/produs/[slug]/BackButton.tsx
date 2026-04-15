"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-[#BC8157] text-sm font-medium mb-8 hover:gap-3 transition-all"
    >
      <ArrowLeft size={16} />
      Înapoi
    </button>
  );
}
