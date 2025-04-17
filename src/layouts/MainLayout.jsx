import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar'ı wrapper içine alıyoruz */}
      <div className="relative">
        <Navbar />
        {/* Navbar'ın yüksekliği kadar boşluk bırakıyoruz */}
        <div className="h-[140px] md:h-[160px]" />{" "}
        {/* Bu yükseklikleri kendi Navbar'ınızın yüksekliğine göre ayarlayın */}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
}

export default MainLayout;
