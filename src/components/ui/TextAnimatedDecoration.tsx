import Link from "next/link";
import React from "react";

const TextAnimatedDecoration = ({text, href}: {text: string, href:string}) => {
  return (
    <Link href={href} className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-600 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
      <span className="text-gray-600">{text}</span>
    </Link>
  );
};

export default TextAnimatedDecoration;
