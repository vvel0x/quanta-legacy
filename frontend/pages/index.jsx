import Head from "next/head";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import { useState, useEffect } from "react";
import DetailCard from "../components/DetailCard";

export default function Home() {
  const prefix = "acqu.is";

  const { data: links, error } = useSWR("/api/slugs", fetcher);
  const [selected, setSelected] = useState(links?.length > 0 ? links[0] : null);

  if (error) return <div>failed to load</div>;
  if (!links) return <div>loading...</div>;

  return (
    <main className="flex-auto flex flex-col px-5 py-8 gap-y-4 text-gray-700">
      <Head>
        <title>Quanta Web</title>
        <meta name="description" content="View and manage your short urls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-row container max-w-screen-xl mx-auto justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-600">Overview</span>
          <h1 className="text-2xl font-semibold text-gray-800">Links</h1>
        </div>
        <button className="px-3 py-2 bg-white border border-gray-300 hover:border-pink-300 hover:text-pink-600 text-sm font-semibold rounded-sm transition ease-in-out duration-100">
          Create New
        </button>
      </section>

      <section className="flex flex-row container max-w-screen-xl mx-auto bg-white rounded-sm border border-slate-200 shadow-sm">
        <div className="w-1/4 table-auto border-r border-gray-200 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-medium  bg-slate-50 text-gray-700 border-b border-gray-200">
            {links?.length ?? 0} Results
          </div>
          <div className="flex flex-col divide-2">
            {links?.length > 0 ? (
              links?.map((slug) => {
                const isActive = selected === slug;

                return (
                  <a
                    key={slug}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(slug);
                    }}
                    className={`${
                      isActive ? "bg-gray-100" : "bg-white"
                    } text-sm text-gray-500
                          `}
                  >
                    <div
                      className={`${
                        isActive ? "bg-gray-100" : "bg-white"
                      } text-sm text-gray-500 w-full px-3 py-2 flex flex-row items-center gap-x-2
                            `}
                    >
                      <span
                        className={` text-xs ${
                          selected === slug
                            ? "bg-pink-100 text-pink-600 border border-pink-300"
                            : "bg-blue-50 text-gray-600"
                        }  py-1 px-2 rounded`}
                      >
                        /{slug}
                      </span>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-700">
                <span className="font-medium">No results</span>
                <p>Try broadening your search</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4 ">
          {selected ? (
            <DetailCard slug={selected} />
          ) : (
            <div className="px-4 py-6 grid place-items-center h-full text-sm text-gray-700">
              {links?.length > 0 ? (
                <p>Select a link to view or edit</p>
              ) : (
                <p>Nothing here yet!</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
