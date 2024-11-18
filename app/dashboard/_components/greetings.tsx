"use client";
import React from "react";

import { formatDate, getGreeting } from "@/lib/utils";

export const Greetings = () => {
  return (
    <div className="text-center">
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {formatDate(new Date())}
      </p>
      <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight ">
        {getGreeting().greeting}
      </h3>
    </div>
  );
};
