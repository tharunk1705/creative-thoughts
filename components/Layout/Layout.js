import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="font-outfit mx-6 md:max-w-2xl md:mx-auto ">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
