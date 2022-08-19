import useSWR, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import { SpinnerInfinity } from "spinners-react";

const DetailCard = ({ slug }) => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR("/api/slugs/" + slug, fetcher);

  const prefix = "acqu.is";

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className="grid place-items-center h-full">
        <SpinnerInfinity size={50} thickness={100} speed={100} />
      </div>
    );

  const { name, url: destination, created_at: ts, hits } = data;
  const url = `http://${prefix}/${slug}`;
  const date = new Date(ts).toDateString();

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
        <button
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          onClick={() => mutate("/api/slugs/" + slug)}
        >
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
        </button>
      </div>
      <div className="border border-blue-200 rounded-md flex flex-row whitespace-nowrap justify-between items-center text-gray-700 p-1 transition ease-in-out">
        <div className="flex flex-row overflow-hidden items-center">
          {/* Copy original URL to clipboard */}
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

        {/* Generate QR Code */}
        <div className="flex flex-row">
          <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center whitespace-nowrap gap-x-2 text-sm">
        <div className="overflow-x-hidden">
          <span className="font-medium">Destination: </span>
          {destination}
        </div>
        <div className="text-xs">
          <button className="px-2 py-1 border border-gray-300 hover:border-pink-300 hover:text-pink-600">
            Modify
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
