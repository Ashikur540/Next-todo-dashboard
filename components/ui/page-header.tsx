import React from "react";

export const PageHeader = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="mb-4 border-b border-muted py-2">
      <h2 className="font-semibold text-xl">{title}</h2>
      <p className="text-sm text-zinc-700">{desc}</p>
    </div>
  );
};
