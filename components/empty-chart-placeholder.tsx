import Image from "next/image";

export const EmptyReportPlaceHolder = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full text-gray-400 py-4 min-h-[350px]">
      <Image
        src={`/Search_empty.png`}
        width={150}
        height={150}
        alt="empty-state-picture"
      />
      <p className="text-xl text-muted-foreground">No data available</p>
    </div>
  );
};
