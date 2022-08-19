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
    <main className="px-5 py-8 text-gray-700">
      <Head>
        <title>Quanta Web</title>
        <meta name="description" content="View and manage your short urls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container max-w-screen-xl mx-auto flex flex-col gap-4">
        <section className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-gray-600">Overview</span>
            <h1 className="text-xl font-semibold text-gray-800">Links</h1>
          </div>
          <button className="px-3 py-2 bg-white border border-gray-300 hover:border-pink-300 hover:text-pink-600 text-sm font-semibold rounded-sm transition ease-in-out duration-100">
            Create New
          </button>
        </section>

        <section className="flex-grow flex flex-row bg-white rounded-sm border border-slate-200 shadow-sm">
          <table className="w-1/3 table-auto border-r border-gray-200 ">
            <thead>
              <tr>
                <th className="px-2 py-1 text-xs font-medium  bg-slate-50 text-gray-700 border-b border-gray-200">
                  {links?.length ?? 0} Results
                </th>
              </tr>
            </thead>
            <tbody>
              {links?.length > 0 ? (
                links?.map((slug) => {
                  const isActive = selected === slug;
                  return (
                    <tr>
                      <a
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
                        <td
                          className={`${
                            isActive ? "bg-gray-100" : "bg-white"
                          } text-sm text-gray-500 w-full px-3 py-2 flex flex-row items-center gap-x-2
                            `}
                        >
                          <span
                            className={` text-xs ${
                              selected === slug
                                ? "bg-pink-100 text-pink-600"
                                : "bg-blue-50 text-gray-600"
                            }  py-1 px-2 rounded`}
                          >
                            /{slug}
                          </span>
                          <p>Lorem</p>
                        </td>
                      </a>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-700">
                    <span className="font-medium">No results</span>
                    <p>Try broadening your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-2/3 ">
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
      </section>
    </main>
  );
}
