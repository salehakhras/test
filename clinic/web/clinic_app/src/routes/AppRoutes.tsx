import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../components/layouts/HomeLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";
import Paths from "../routes/Paths";
import AuthPage from "../pages/auth/AuthPage";
import PageNotFound from "../pages/PageNotFound";
import OTPPage from "../features/auth/pages/OTPPage";
import ManagerMainPage from "../pages/manager/ManagerMainPage";
import PublicOnlyRoute from "./PublicOnlyRoute";
import CreateClinicPage from "../pages/CreateClinicPage";
import UnverifiedOnlyRoute from "./UnverifiedOnlyRoute";
import ProtectedRoute from "./ProtectedRoute";
import DashboardRedirect from "./DashboardRedirect";
import ManagerPatientsPage from "../features/dashboard/manager/pages/ManagerPatientsPage";
import ManagerDashboardPage from "../features/dashboard/manager/pages/ManagerDashboardPage";
import ClinicSettings from "../features/dashboard/manager/pages/ClinicSettings";
import ManagerRedirectToFirstClinic from "./ManagerRedirectToFirstClinic";
import ManagerStaffPage from "../features/dashboard/manager/pages/ManagerStaffPage";
import { userRoles } from "../utils/constants/constants";
// import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.base} element={<HomePage />}>
          <Route index element={<HomeLayout />} />
          <Route path={Paths.auth} element={<AuthPage />}>
            <Route
              path={Paths.loginPage}
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            ></Route>
            <Route
              path={Paths.signupPage}
              element={
                <PublicOnlyRoute>
                  <SignupPage />
                </PublicOnlyRoute>
              }
            ></Route>
            <Route
              path={Paths.verifyPage}
              element={
                <UnverifiedOnlyRoute>
                  <OTPPage />
                </UnverifiedOnlyRoute>
              }
            ></Route>
          </Route>
          <Route
            path={Paths.createClinic}
            element={
              <ProtectedRoute allowedRoles={[userRoles.patient]}>
                <CreateClinicPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path={Paths.dashboard}>
          <Route index element={<DashboardRedirect />} />
          <Route
            path={`${Paths.manager}`}
            element={<ManagerRedirectToFirstClinic />}
          />
          <Route
            path={`${Paths.manager}/:clinicId`}
            element={
              <ProtectedRoute allowedRoles={[userRoles.manager]}>
                <ManagerMainPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ManagerDashboardPage />} />
            <Route path={Paths.patients} element={<ManagerPatientsPage />} />
            <Route path={Paths.staff} element={<ManagerStaffPage />} />
            <Route path={Paths.settings} element={<ClinicSettings />}></Route>
          </Route>
          <Route
            path={Paths.doctorPage}
            element={
              <ProtectedRoute allowedRoles={[userRoles.doctor]}>
                <ManagerMainPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
