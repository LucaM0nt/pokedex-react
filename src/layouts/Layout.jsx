import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Layout() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function update() {
      const hdr = document.querySelector("header");
      const hh = hdr ? hdr.offsetHeight : 0;
      setHeaderHeight(hh);
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto pt-22 min-h-0">
        {/* This wrapper allows whole page scrolling */}
        <div className="space-y-10 relative">
          {/* Pokédex scrolls independently. On desktop the section
              fills viewport minus header so Footer is off-screen until
              the user scrolls. On mobile we keep natural height. */}
          <section
            className="overflow-y-auto overflow-x-hidden"
            style={
              isDesktop
                ? { height: `calc(98vh - ${headerHeight}px)` }
                : undefined
            }
          >
            <Outlet />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
