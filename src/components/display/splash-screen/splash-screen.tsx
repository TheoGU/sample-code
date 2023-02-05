import React from "react";
import { Loader } from "@/components/display/loader/loader";

export function SplashScreen() {
  return (
    <div className="flex flex-column w-screen h-screen justify-center items-center">
      <Loader size="md" />
    </div>
  );
}
