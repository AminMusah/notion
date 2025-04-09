import Image from "next/image";
import React from "react";

export default function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl ">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src={"/511.Supporting-The-World.png"}
            alt="img"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src={"/519.Reporting-Stats.png"}
            alt="img"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
