"use client";
import React from "react";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="h-10 rounded-lg bg-activeBtn font-bold px-5">
      {text}
    </button>
  );
};

export default Button;
