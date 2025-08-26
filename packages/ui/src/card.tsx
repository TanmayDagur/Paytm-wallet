import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-500 pb-2 ">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}