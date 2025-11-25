import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`flex flex-col ${
        isHome ? "h-screen" : "min-h-screen"
      } overflow-x-hidden`}
    >
      <Header />

      <main className={`flex-1 container mx-auto ${isHome ? "min-h-0" : ""}`}>
        {/* On homepage: main fills remaining space; inner section scrolls. Others: natural height. */}
        <section className={isHome ? "h-full overflow-auto" : ""}>
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}
