import React from "react";
import Logo from "./Logo";

export default function Topbar() {
  return (
    <div className="bg-red-500 h-12 flex justify-between items-center">
      <Logo justify="justify-center" />
    </div>
  );
}
