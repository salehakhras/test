import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "./hooks/hooks.ts";
import i18n from "./i18n";
import { useEffect } from "react";
import { fetchUser } from "./features/auth/slices/authThunk.ts";
import { StatusRequest } from "./utils/constants/StatusRequest.ts";
import LoadingPage from "./pages/LoadngPage.tsx";

function App() {
  const { language } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const { fetchUserStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  if (fetchUserStatus === StatusRequest.loading) return <LoadingPage />;

  return (
    <div data-theme="custom">
      <AppRoutes />
    </div>
  );
}

export default App;
