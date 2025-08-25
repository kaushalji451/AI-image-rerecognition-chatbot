
import { getProfile } from "../utils/Authapi";

export default async function IsLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const response = await getProfile(token);
        console.log("Profile data:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}
