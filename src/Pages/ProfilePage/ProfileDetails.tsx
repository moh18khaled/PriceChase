import { useEffect, useState } from "react";
import apiBaseUrl from "../../config/axiosConfig";
const ProfileDetails = () => {
    const [userAccountData,setUserAccountData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        profilePicture : "",
    });

    // fetch profile data
    useEffect(()=>{
        const fetchedData = async ()=>{
        try {
                const response = await apiBaseUrl.get("/user/account",{withCredentials : true});
                console.log(response);
                setUserAccountData({
                    firstName : response.data.data.firstName,
                    lastName : response.data.data.lastName,
                    email : response.data.data.email,
                    profilePicture : response.data.data.profilePicture,
                });
            } 
         catch (error) {
            console.log(error);
        };
    }
     fetchedData();
    },[])

  return (
    <div className="dark:bg-gray-600 dark:text-white">
      <div className="py-12 px-5 lg:py-24 lg:px-24">
        <div className="flex flex-col items-center space-y-6 lg:flex-row lg:items-center lg:space-x-20 lg:space-y-0">
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full">
            <img className="w-full h-full rounded-full" src={userAccountData.profilePicture} alt="" />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-lg md:text-xl font-bold mb-2">{userAccountData.firstName} {userAccountData.lastName}</h1>
            <p className="text-gray-500 dark:text-gray-200 md:text-lg mb-4">{userAccountData.email}</p>
          </div>
          <div className="flex space-x-4 justify-center lg:justify-start">
            <button className="flex p-2 bg-customBlue dark:bg-yellow-500 rounded-xl hover:rounded-3xl dark:hover:bg-yellow-600 transition-all duration-300 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="flex p-2 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;