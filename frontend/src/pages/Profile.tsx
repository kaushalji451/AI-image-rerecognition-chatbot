import { useState, useEffect } from "react";
import IsLoggedIn from "../utils/IsLoggedIn";
import { useNavigate } from "react-router-dom";
type ProfileType = {
  name: string;
  email: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);

  const fetchProfile = async () => {
    const data = await IsLoggedIn();
    if (data) {
      setProfile(data);
    } else {
      setProfile(null);
      alert("Please login to access this page");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <p>{profile.email}</p>
          gfdjghfdkj
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile
