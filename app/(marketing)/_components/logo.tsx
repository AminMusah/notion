import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src={"/globe.svg"} width={40} height={40} alt="logo" />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
}
