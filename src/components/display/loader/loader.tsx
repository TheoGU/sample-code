import React from "react";
import { Image } from "@/components/display/image/image";
import loader from "@/images/loader.svg";

export function Loader() {
  return <Image src={loader} alt="Loader image" />;
}
