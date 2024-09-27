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
import OrganizerDashBoard from "./pages/organizer/OrganizerDashBoard.tsx";

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
          <Route path="/register-organizer" element={<OrganizerRegister />} />
          <Route path="/login-organizer" element={<LoginOrganizerPage />} />
        </Route>

        <Route path="/organizer/dashboard" element={<OrganizerDashBoard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
