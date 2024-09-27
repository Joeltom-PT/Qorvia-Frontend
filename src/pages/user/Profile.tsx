import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/action/userActions";
import { toast } from "react-toastify";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => { 
        try {
            await dispatch(logoutUser());
            navigate('/login');
        } catch (error) {
            const errorMessage = "Logout using failed."
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Profile;
