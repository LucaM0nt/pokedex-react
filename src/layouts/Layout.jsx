import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Main occupa lo spazio rimanente; lascia spazio per header e footer */}
      <main className="flex-1 container mx-auto pt-16 pb-40 min-h-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
