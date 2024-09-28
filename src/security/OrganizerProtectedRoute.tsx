import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';


const OrganizerProtectedRoute: React.FC = () => {
  const profile = useSelector((state: RootState) => state.organizer.profile);

  if (!profile) {
    return <Navigate to="/login-organizer" />;
  }

  const { verificationStatus, registerRequestStatus, status } = profile;

  if (verificationStatus === 'PENDING' || registerRequestStatus === 'PENDING' || status !== 'ACTIVE') {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Account Status</h2>
        <p>Your account is currently under review. Please complete the following steps:</p>
        <ul className="list-disc list-inside mt-2">
          {verificationStatus === 'PENDING' && <li>Verification is pending.</li>}
          {registerRequestStatus === 'PENDING' && <li>Registration request is pending.</li>}
          {status !== 'ACTIVE' && <li>Your account status is not active.</li>}
        </ul>
        <p className="mt-4">Please contact the support team if you have any questions or need further assistance.</p>
      </div>
    );
  }

  return <Outlet />;
};


export default OrganizerProtectedRoute;
