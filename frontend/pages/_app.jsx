import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-slate-50">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
