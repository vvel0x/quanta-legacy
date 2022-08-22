import Head from "next/head";
import fetcher from "../lib/fetcher";
import useSWR from "swr";
import { useState, useEffect } from "react";
import DetailCard from "../components/DetailCard";
import Spinner from "../components/Spinner";
import AddLinkButton from "../components/AddLinkButton";
import { SettingsButton } from "../components/SettingsButton";

export default function Home() {
  const { data, error } = useSWR("/api/slugs", fetcher);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (links?.length) setSelected(selected ? selected : JSON.parse(links[0]));
  }, [data]);

  if (error)
    return (
      <div className="grid place-items-center min-h-screen p-10">
        <Head>
          <title>Quanta Web</title>
        </Head>
        <div className="flex flex-col items-center gap-4">
          <p className="italic text-gray-600">Couldn not connect to backend!</p>
        </div>
      </div>
    );
  if (!data) return <Spinner />;

  const { prefix = null, links = null } = data;

  return (
    <main className="flex-auto flex flex-col px-5 py-6 text-gray-700 h-screen container max-w-screen-xl mx-auto">
      <Head>
        <title>Quanta Web</title>
        <meta name="description" content="View and manage your short urls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs uppercase text-gray-600">Overview</span>
          <h1 className="text-2xl font-semibold text-gray-800">
            Quanta Dashboard
          </h1>
        </div>
        <div className="flex gap-2">
          <AddLinkButton
            disabled={!prefix}
            prefix={prefix}
            select={setSelected}
          />
          <SettingsButton prefix={prefix} />
        </div>
      </section>

      <section className="flex-grow flex flex-row my-4 bg-white rounded-sm border border-slate-200 shadow-sm">
        <div className="w-1/4 table-auto border-r border-gray-200 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-medium  bg-slate-50 text-gray-700 border-b border-gray-200">
            {links?.length ?? 0} Results
          </div>
          <div className="flex flex-col divide-2 divide-gray-800 overflow-y-auto">
            {links?.length > 0 ? (
              links?.map((data) => {
                const link = JSON.parse(data);
                const { name, slug } = link;
                const isActive = selected?.slug === slug;

                return (
                  <a
                    key={slug}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected(link);
                    }}
                    className={`${
                      isActive ? "bg-gray-100" : "bg-white"
                    } text-sm text-gray-500
                          `}
                  >
                    <div
                      className={`${
                        isActive ? "bg-gray-100" : "bg-white"
                      } text-gray-500 w-full px-3 py-2 flex flex-row items-center gap-x-2
                            `}
                    >
                      <span
                        className={` text-xs ${
                          isActive
                            ? "bg-pink-100 text-pink-600 border border-pink-300"
                            : "bg-blue-50 text-gray-600 border border-gray-200"
                        }  py-1 px-2 rounded`}
                      >
                        /{slug}
                      </span>
                      <p
                        className={`${
                          isActive ? "text-gray-900" : ""
                        } font-medium`}
                      >
                        {name}
                      </p>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-700">
                <span className="font-medium">No results</span>
                <p>
                  <i>It is so quiet here... 👀</i>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4 ">
          {selected ? (
            <DetailCard prefix={prefix} link={selected} select={setSelected} />
          ) : (
            <div className="px-4 py-6 grid place-items-center h-full text-sm text-gray-700">
              {prefix ? (
                links?.length > 0 ? (
                  <p>Select a link to view or edit</p>
                ) : (
                  <p>Nothing here yet!</p>
                )
              ) : (
                <p className="bg-red-200 p-3 rounded text-red-800">
                  <strong>No prefix configured!</strong> You will need to
                  specify one (in Settings) to use Quanta.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="text-xs text-gray-600">
        <span className="font-semibold">Quanta</span> &mdash; Modular URL
        shortener
      </footer>
    </main>
  );
}
