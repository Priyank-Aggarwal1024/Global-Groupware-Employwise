import { Outlet, useNavigate } from "react-router-dom";
import { FiUsers, FiLogOut } from "react-icons/fi";
import ProtectedRoute from "../ProtectedRoute";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-xl font-bold text-white hover:text-gray-200 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  UserHub
                </span>
              </button>
            </div>

            <div className="flex items-center sm:space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiUsers className="w-5 h-5 sm:mr-2" />
                Users
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiLogOut className="w-5 h-5 sm:mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </main>
    </div>
  );
};

export default MainLayout;
