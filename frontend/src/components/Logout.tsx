import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // // Remove specific items
        if (localStorage.getItem('token')) localStorage.removeItem('token');
        if (localStorage.getItem("imageId")) localStorage.removeItem('imageId');
        if (localStorage.getItem("imageLabel")) localStorage.removeItem('imageLabel');
        if (localStorage.getItem("imageResponse")) localStorage.removeItem('imageResponse');
        if (localStorage.getItem("imageUrl")) localStorage.removeItem('imageUrl');

        // Optional: redirect to login or home page
        navigate('/login');
        window.dispatchEvent(new Event("loginStatusChanged"));
    };

    return (
        <div>
            <button className="bg-green-200 px-3 py-1 rounded-full text-black my-2 font-semibold cursor-pointer" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Logout
