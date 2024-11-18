import React from "react";

export const TaskCardSkeleton = () => {
  return (
    <div className="animate-pulse p-4 w-full">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-full mb-2 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/2 flex items-center gap-2">
          <div className="h-2 w-2 bg-gray-200 rounded"></div>
          <div className="h-2 w-16 bg-gray-200 rounded"></div>
          <div className="h-2 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};
