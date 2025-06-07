import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiBaseUrl from "../../config/axiosConfig";

// Define types for our form data and state
type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ShowPasswordState = {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

// Define the shape of the error response from the API
interface ApiErrorResponse {
  error?: string;
  message?: string;
}


const UpdatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof ShowPasswordState) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({ title: "Passwords do not match", icon: "error" });
      return;
    }

    try {
      const response = await apiBaseUrl.patch(
        `/user/account/update-password`,
        { 
          currentPassword: formData.oldPassword, 
          newPassword: formData.newPassword 
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Swal.fire({ 
          title: "Password Updated Successfully, please log in again.", 
          icon: "success" 
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      
      Swal.fire({
        icon: "error",
        title: "Failed to Update Password",
        text: axiosError.response?.data?.error || 
             axiosError.response?.data?.message || 
             "An error occurred while updating password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Update Password</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {(Object.keys(formData) as Array<keyof FormData>).map((field) => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700">
                {field === "oldPassword" 
                  ? "Old Password" 
                  : field === "newPassword" 
                    ? "New Password" 
                    : "Confirm New Password"}
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;