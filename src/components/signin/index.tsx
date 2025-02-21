"use client";
import { useEffect, useState } from "react";
import eyeh from '../../Assets/eyeh.svg';
import eye from '../../Assets/eye.svg';
import useAuth from "../Hooks/useAuth";
import { SignUpForm } from "../../Utils/types";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
    const { signin } = useAuth();
    const token = localStorage.getItem("contacts-token") as string;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [signInData, setSignInData] = useState<SignUpForm>({
        email: "",
        password: "",
    })

    const handleSignIn = async () => {
        const res = await signin(signInData); 
        if(res?.data?.token) {
            localStorage.setItem("contacts-token", res?.data?.token as string);
            window.location.href = "/";
        } else {
            alert("Something went wrong please try again!");
        }
    }

    const handleChange = (type: string, value: string) => {
        setSignInData(prev => ({ ...prev, [type]: value }));
    }

    useEffect(() => {
        if (token) {
            window.location.href = "/";
        }
    },[token]);

    return (
        <div className="signuppage bg-[#ECBC76] w-full h-[100vh] flex justify-center items-center">
            <div className="form_container w-[370px] h-[540px] shadow-2xs bg-[#FFF] rounded-md p-6 py-8">
                <div className="form_parent Poppins p-2 flex flex-col gap-8">
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col gap-2 w-fit">
                            <p className="text-lg -ml-[5px]">Welcome to <span className="font-bold text-[#E48700]">Q-B</span></p>
                            <div className="text-5xl font-bold">
                                Sign In
                            </div>
                        </div>
                        <div className="text-[13px] flex flex-col items-end">
                            <p className="text-[#8D8D8D]">
                                Don't Have Account ?
                            </p>
                            <Link href="/signup">
                                <p className="text-[#E48700] cursor-pointer">
                                    Sign Up
                                </p>
                            </Link>
                        </div>
                    </div>
                    {/* 2nd Section */}
                    <div className="form_section flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="">Email address</label>
                            <input onChange={(e) => handleChange("email", e.target.value)} value={signInData.email} id="email" className="form_inputs w-full  h-[47px]" type="email" placeholder="example@email.com" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="Password" className="">Password</label>
                            <div className="flex justify-center align-center form_inputs">
                                <input onChange={(e) => handleChange("password", e.target.value)} value={signInData.password} id="Password" className="w-full h-[47px]" type={showPassword ? "text" : "password"} placeholder="password" />
                                <Image alt="eye" className="cursor-pointer pr-1" onClick={() => setShowPassword(!showPassword)} src={!showPassword ? eyeh : eye} />
                            </div>
                        </div>
                        <p className="text-right text-[#E48700] cursor-pointer p-1">Forgot Password ?</p>
                        <button onClick={handleSignIn} className="quick-clasic-button">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignIn;