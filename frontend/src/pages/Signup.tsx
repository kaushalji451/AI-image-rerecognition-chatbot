import { FcGoogle } from "react-icons/fc";
import { PiInstagramLogo } from "react-icons/pi";
import { useState } from 'react';
import { registerUser } from "../utils/Authapi";
import { Link } from "react-router-dom";

const Signup = () => {
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });

    let handleChange = (name: string, value: string) => {
        setformData({ ...formData, [name]: value });
    }

    let handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);
        try {
            let data = await registerUser(formData.email, formData.password);
            console.log((data.data));
            alert("User registered successfully know you can login");
        } catch (error) {
            alert("Some error occurred.");
            console.log(error);
        }
        setformData({
            email: "",
            password: ""
        });
    }
    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white  flex items-center justify-center'>
                <div className='bg-pink-500 rounded-xl pb-20'>
                    <div className='pt-10 pb-5 flex flex-col items-center'>
                        <p className='text-3xl'>AK</p>
                        <p>Welcome to our website please signup</p>
                        <h1 className='text-5xl font-bold'>Signup</h1>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='flex flex-col py-2 px-10'>
                            <label htmlFor="">Email</label>
                            <input type="email" className='bg-white text-black mt-2 px-2 min-md:w-100 py-2 rounded-xl '
                            placeholder="enter the email id"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col py-2 px-10'>
                            <label htmlFor="">Password</label>
                            <input type="password" className='bg-white text-black mt-2 px-2 min-md:w-100 py-2 rounded-xl ' placeholder="enter the password"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center pt-5'>
                            <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Signup</button>
                        </div>
                    </form>

                    {/*all auth signup optiona  */}
                    <div className='mt-10 flex flex-col gap-5'>
                        <div className='bg-white mx-10 rounded-xl px-6 flex py-3 items-center gap-2'>
                            <p className='text-3xl'><FcGoogle /></p>
                            <p className='text-black font-semibold'>Continue with Google</p>

                        </div>
                        <div className='bg-white mx-10 rounded-xl px-6 flex py-3 items-center gap-2'>
                            <p className='text-3xl text-red-500'><PiInstagramLogo /></p>
                            <p className='text-black font-semibold'>Continue with Instagram</p>

                        </div>
                    </div>
                    <div className='flex justify-center pt-4'>
                        <p>Allredy have an account? <Link to="/login" className='hover:text-blue-800'>Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
