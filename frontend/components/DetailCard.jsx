import { SpinnerDiamond } from "spinners-react";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import fetcher from "../lib/fetcher";
import CopyToClipboard from "./CopyToClipboard";
import IconButton from "./IconButton";
import QR from "./QR";

const DetailCard = ({ prefix, link, select }) => {
  const { name, slug } = link;
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR("/api/slugs/" + slug, fetcher);

  const [errors, setErrors] = useState({});

  const handleRefresh = () => mutate("/api/slugs/" + slug);

  const handleDelete = async () => {
    const deleteSlug = await fetch("/api/slugs/" + slug, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: link }),
    });

    if (!deleteSlug.ok) setErrors({ ...errors, delete: true });
    mutate("/api/slugs");
    select(null);
  };

  if (error)
    return (
      <div className="grid place-items-center h-full">
        <p>Something went wrong!</p>
      </div>
    );
  if (!data)
    return (
      <div className="grid place-items-center h-full">
        <SpinnerDiamond size={50} thickness={100} speed={100} />
      </div>
    );

  const { url: destination, created, hits } = data;
  const url = `http://${prefix}/${slug}`;
  const date = new Date(created).toDateString();

  return (
    <div className="flex flex-col px-6 py-5 gap-y-5">
      <div className="flex flex-row justify-between items-start">
        <div className="overflow-x-hidden">
          <div className="text-xl font-medium">{name}</div>
          <div className="flex flex-row text-gray-600 text-sm gap-x-2">
            <div className="">Created {date}</div>
            <span>&bull;</span>
            <div>{hits} Hits</div>
          </div>
        </div>

        {/* Refresh button */}
        <div>
          <IconButton title="Refresh" handleClick={handleRefresh}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </IconButton>

          <IconButton title="Delete" handleClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4  "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </IconButton>
        </div>
      </div>
      <div className="border border-blue-200 rounded-md flex flex-row whitespace-nowrap justify-between items-center text-gray-700 p-1 transition ease-in-out">
        <div className="flex flex-row overflow-hidden items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>

          <a
            href={url}
            target="_BLANK"
            className="hover:text-pink-600 transition ease-in-out"
          >
            {url}
          </a>
        </div>

        <div className="flex flex-row">
          {/* Copy to Clipboard */}
          <CopyToClipboard data={url} />

          {/* Generate QR Code */}
          <QR data={url} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center whitespace-nowrap gap-x-2 text-sm">
        <div className="overflow-x-hidden">
          <span className="font-semibold">Destination: </span>
          {destination}
        </div>
        {/* Modify button to be implemented in the future */}
        {/* <div className="text-xs">
          <button className="px-2 py-1 border border-gray-300 hover:border-pink-300 hover:text-pink-600">
            Modify
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DetailCard;
