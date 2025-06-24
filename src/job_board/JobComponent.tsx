import React from "react";

type JobComponentProps = {
  title: string;
  url: string;
  id: number;
  by: string;
  time: number;
};

function JobComponent({ title, url, id, by, time }: JobComponentProps) {
  return (
    <div className="border border-gray-400/60 rounded-md shadow-md p-2 hover:bg-gray-100 hover:shadow-lg">
      <a
        href={url}
        target="_blank"
        className="block text-left text-stone-700 text-xl font-semibold hover:text-blue-500 hover:underline"
      >
        {title}
      </a>
      <div className="flex gap-2 text-gray-400">
        <span>By {by}</span>
        <span>-</span>
        <span>{new Date(time * 1000).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default JobComponent;
