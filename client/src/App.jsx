import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NoticesProvider } from "./context/NoticesContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import NoticesPage from "./pages/NoticesPage";
import NoticeFormPage from "./pages/NoticeFormPage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <NoticesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noticias/:id" element={<NoticeDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute requiredEmail="bluyo@undc.edu.pe" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/notices/new" element={<NoticeFormPage />} />
              <Route path="/notices/:id/edit" element={<NoticeFormPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </NoticesProvider>
    </AuthProvider>
  );
};

export default App;
