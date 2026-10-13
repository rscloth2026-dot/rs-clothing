"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Skiper-UI 40: Stylized Link Components (CssLink)
 * Source: https://skiper-ui.com/registry/skiper40.json
 * Micro-interactions with physical bezier cubic-bezier(0.4, 0, 0.2, 1).
 */

export const CssUnderlineLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center text-current",
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[1.5px] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const CssArrowLink = ({
  children,
  href,
  className,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) => {
  const content = (
    <>
      <span>{children}</span>
      <svg
        className="ml-1.5 size-[0.65em] translate-y-0.5 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const sharedClasses = cn(
    "group relative inline-flex items-center text-current",
    "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[1.5px] before:w-full before:bg-current before:content-['']",
    "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
    "hover:before:origin-left hover:before:scale-x-100",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClasses}>
      {content}
    </Link>
  );
};
