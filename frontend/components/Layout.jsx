import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-slate-100">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
