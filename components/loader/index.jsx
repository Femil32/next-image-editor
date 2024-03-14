import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Image
        src={"/assets/animated/loading.svg"}
        height={100}
        width={100}
        alt="loading"
      />
    </div>
  );
};

export default Loader;
