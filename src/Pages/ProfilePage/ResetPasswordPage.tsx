import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiBaseUrl from '../../config/axiosConfig';

// Define types for our component
interface ResetPasswordData {
    newPassword: string;
    confirmPassword: string;
}

interface ResetPasswordResponse {
    message?: string;
}

interface ErrorResponse {
    message?: string;
}

// Custom hook to extract query parameters with TypeScript
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPasswordPage: React.FC = () => {
    const query = useQuery();
    const token = query.get("token"); // Get token from URL query params

    const [formData, setFormData] = useState<ResetPasswordData>({
        newPassword: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Passwords do not match.",
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiBaseUrl.post<ResetPasswordResponse>(
                `/user/reset-password/confirm`,
                {
                    token,
                    newPassword: formData.newPassword,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: "Password Reset",
                    text: "Your password has been reset successfully.",
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
                text: axiosError.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-light-gray flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <Link to="/" className="text-3xl font-bold text-[#8B4513] flex justify-center mb-6">
                    PriceChase
                </Link>
                <h1 className="text-2xl font-bold text-[#8B4513] text-center mb-4">
                    Reset Password
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-[#8B4513]">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={formData.newPassword}
                            id="newPassword"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B4513]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#8B4513]">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            id="confirmPassword"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B4513]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8B4513] text-white py-2 rounded-lg hover:bg-[#5a2d0c] transition disabled:opacity-50 flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;