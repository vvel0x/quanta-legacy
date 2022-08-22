import Head from "next/head";
import { SpinnerDiamond } from "spinners-react";

const Spinner = () => {
  return (
    <div className="grid place-items-center min-h-screen p-10">
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="flex flex-col items-center gap-4">
        <SpinnerDiamond size={50} thickness={100} speed={100} />
        <p className="italic text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
