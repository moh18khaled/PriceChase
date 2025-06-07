import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiBaseUrl from '../../config/axiosConfig';

// Define types for API responses
interface ForgotPasswordResponse {
    message?: string;
}

interface ErrorResponse {
    error?: string;
    message?: string;
}

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await apiBaseUrl.post<ForgotPasswordResponse>(
                `/user/reset-password`, 
                { email },
                { withCredentials: true }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Email Sent",
                    text: "Please check your email for the password reset link.",
                    icon: "success",
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: axiosError.response?.data?.error || 
                     axiosError.response?.data?.message || 
                     "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className='h-screen bg-light-gray'>
            <div className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                    <Link to="/" className="flex items-center mb-6 mt-6 text-3xl font-bold sm:text-4xl text-[#8B4513]">
                        PriceChase
                    </Link>
                    <div className="w-full bg-[#E8D8C5] rounded-lg shadow-md sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#8B4513] md:text-2xl">
                                Forgot Password
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-[#8B4513]"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        name="email"
                                        id="email"
                                        onChange={handleEmailChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#8B4513] block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#8B4513] hover:bg-[#030303] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </div>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                                <p className="text-sm font-light text-[#030303]">
                                    Remember your password?{' '}
                                    <Link
                                        to="/login"
                                        className="font-medium text-[#8B4513] hover:underline"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;