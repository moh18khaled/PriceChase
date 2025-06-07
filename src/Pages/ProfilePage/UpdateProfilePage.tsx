import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiCamera } from "react-icons/fi";
import apiBaseUrl from "../../config/axiosConfig";

interface FormData {
  firstname: string;
  lastname: string;
  profilePicture: File | string;
  previewImage: string;
}

interface InitialData {
  firstname: string;
  lastname: string;
  profilePicture: string;
}

interface CloudinaryResponse {
  profilePictureUrl: string;
  profilePicturePublic_id: string;
}

const UpdateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    profilePicture: "",
    previewImage: "",
  });

  const [initialData, setInitialData] = useState<InitialData>({ 
    firstname: "",
    lastname: "",
    profilePicture: "" 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiBaseUrl.get(`/user/account`, { 
          withCredentials: true 
        });
        console.log(response);

        setFormData({
          firstname: response.data.data.firstName,
          lastname: response.data.data.lastName,
          profilePicture: response.data.data.profilePicture,
          previewImage: response.data.data.profilePicture,
        });

        setInitialData({
          firstname: response.data.data.firstName,
          lastname: response.data.data.lastName,
          profilePicture: response.data.data.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
        previewImage: imageUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<CloudinaryResponse> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "original");
    data.append("cloud_name", "dqmp5l622");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dqmp5l622/image/upload", {
        method: "POST",
        body: data,
      });
      return await response.json();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let profilePictureUrl: string = typeof formData.profilePicture === 'string' 
        ? formData.profilePicture 
        : '';
      let profilePicturePublic_id = "";

      if (formData.profilePicture instanceof File) {
        const result = await uploadImageToCloudinary(formData.profilePicture);
        profilePictureUrl = result.profilePictureUrl;
        profilePicturePublic_id = result.profilePicturePublic_id;
      }

      const updateData = new FormData();

      if (formData.firstname.trim() && formData.firstname !== initialData.firstname) {
        updateData.append("firstname", formData.firstname);
      }

      if (formData.lastname.trim() && formData.lastname !== initialData.lastname) {
        updateData.append("lastname", formData.lastname);
      }

      if (formData.profilePicture instanceof File) {
        updateData.append("profilePictureUrl", profilePictureUrl);
        updateData.append("profilePicturePublic_id", profilePicturePublic_id);
      }

      if (Array.from(updateData.keys()).length === 0) {
        Swal.fire("No changes detected", "", "info");
        return;
      }

      const response = await apiBaseUrl.patch(`/user/account`, updateData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        Swal.fire({ 
          title: "Profile Updated Successfully", 
          icon: "success" 
        }).then(() => {
          navigate("/profile-page");
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      Swal.fire({
        icon: "error",
        title: "Failed to Update Profile",
        text: errorMessage,
      });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 cursor-pointer transition-transform transform group-hover:scale-105"
                src={formData.previewImage}
                alt="Profile"
                onClick={handleImageClick}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                onClick={handleImageClick}
              >
                <FiCamera className="text-white text-2xl" />
              </div>
            </div>
            <input
              type="file"
              name="profilePicture"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="text-gray-700 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="text-gray-700 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-customBlue text-white py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;