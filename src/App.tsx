import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import NotFound from "./others/NotFound";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ExploreEvents from "./pages/user/ExploreEvents";
import UserLayout from "./layouts/UserLayout";
import OtpVerification from "./pages/global/OtpVerification.tsx";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/user/Profile.tsx";
import { useSelector } from "react-redux";
import { IUserState } from "./interfaces/user.ts";
import { RootState } from "./redux/store.ts";
import OrganizerLandingPage from "./pages/organizer/OrganizerLandingPage";
import OrganizerRegister from "./pages/organizer/OrganizerRegister.tsx";
import LoginOrganizerPage from "./pages/organizer/LoginOrganizerPage.tsx";
import OrganizerLayout from "./layouts/OrganizerLayout.tsx";
import OrganizerDashboard from "./pages/organizer/dashboard/OrganizerDashBoard.tsx";
import OrganizerEventManagement from "./pages/organizer/dashboard/OrganizerEventManagement.tsx";
import OrganizerBlogManagement from "./pages/organizer/dashboard/OrganizerBlogManagement.tsx";
import OrganizerReportsAndGraphManagement from "./pages/organizer/dashboard/OrganizerReportsAndGraphManagement.tsx";
import OrganizerUserReportManagement from "./pages/organizer/dashboard/OrganizerUserReportManagement.tsx";
import OrganizerPayoutManagement from "./pages/organizer/dashboard/OrganizerPayoutManagement.tsx";
import OrganizerSettings from "./pages/organizer/dashboard/OrganizerSettings.tsx";
import OrganizerProfile from "./pages/organizer/dashboard/OrganizerProfile.tsx";
import OrganizerProtectedRoute from "./security/OrganizerProtectedRoute.tsx";
import UnauthenticatedOrganizerPages from "./security/UnauthenticatedOrganizerPages.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProtectedRoute from "./security/AdminProtectedRoutes.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AdminUserManagement from "./pages/admin/AdminUserManagement.tsx";
// import OrganizerStatusChecker from "./security/components/OrganizerStatusChecker.tsx";

interface AnonymousRouteProps {
  children: JSX.Element;
}

const AnonymousRoute: React.FC<AnonymousRouteProps> = ({ children }) => {
  const { isLogged } = useSelector((state: RootState) => state.user as IUserState);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
};

interface VerificationRouteProps {
  children: JSX.Element;
}

const VerificationRoute: React.FC<VerificationRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user as IUserState);

  if (!user || user.verificationStatus !== "PENDING") {
    return <Navigate to="/" replace />;
  }

  return children;
};

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogged } = useSelector((state: RootState) => state.user as IUserState);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
      
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AnonymousRoute>
              <Register />
            </AnonymousRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <VerificationRoute>
              <OtpVerification />
            </VerificationRoute>
          }
        />

        <Route path="/" element={<UserLayout />}>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreEvents />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          {/* Organizer Route without ProtectedRoute */}
          <Route path="/become-an-organizer" element={<OrganizerLandingPage />} />
          
          <Route 
        path="/register-organizer" 
        element={<UnauthenticatedOrganizerPages element={<OrganizerRegister />} />} 
      />
      <Route 
        path="/login-organizer" 
        element={<UnauthenticatedOrganizerPages element={<LoginOrganizerPage />} />} 
      />
        </Route>

<Route path="/organizer" element={<OrganizerLayout />}>
  <Route path="" element={<Navigate to="dashboard" replace />} />
  <Route element={<OrganizerProtectedRoute />}>
    <Route path="dashboard" element={<OrganizerDashboard />} />
    <Route path="event-management" element={<OrganizerEventManagement />} />
    <Route path="blog-management" element={<OrganizerBlogManagement />} />
    <Route path="reports-and-graph" element={<OrganizerReportsAndGraphManagement />} />
    <Route path="user-reports" element={<OrganizerUserReportManagement />} />
    <Route path="payout-management" element={<OrganizerPayoutManagement />} />
    <Route path="settings" element={<OrganizerSettings />} />
  </Route>
  <Route path="profile" element={<OrganizerProfile />} />
</Route>

    <Route path="/admin" element={<AdminLayout />}>
    <Route path="" element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route path="user-management"
        element={
          <AdminProtectedRoute>
            <AdminUserManagement />
          </AdminProtectedRoute>
        }
      />
    </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
