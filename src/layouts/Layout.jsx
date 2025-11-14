import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Main occupa lo spazio rimanente */}
      <main className="flex-1 overflow-y-auto container mx-auto mt-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
