import React from "react";
import LogoSvg from "../assets/logo.svg";

export default function Logo({ size }) {
  const height = size === "sm" ? "h-6" : "h-8";
  const fontSize = size === "sm" ? "text-xl" : "text-2xl";
  return (
    <div className="flex items-center gap-3">
      <img className={height} src={LogoSvg} alt="logo" />
      <h2 className={`${fontSize} tracking-widest font-medium mb-0.5`}>
        get<span className="text-primary">it</span>done.
      </h2>
    </div>
  );
}