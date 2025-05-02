import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import apiBaseUrl from '../config/axiosConfig';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  profilePicture?: {
    url: string;
  };
  firstName: string;
  lastName: string;
  email: string;  // Added email field
  hidden?: boolean;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nextCursor, setNextCursor] = useState("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initial fetch on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async (cursor = "", isGoingBack = false) => {
    try {
      setIsLoading(true);
      let url = `/admin/users?limit=5`;
      if (cursor) url += `&cursor=${cursor}`;
      
      const response = await apiBaseUrl.get(url);
      console.log('API Response:', response.data);
      
      if (response.data?.users) {
        setUsers(response.data.users);
        setNextCursor(response.data.nextCursor || "");

        // Only add to history if moving forward
        if (!isGoingBack && cursor) {
          setCursorHistory(prev => [...prev, cursor]);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error loading users',
        text: 'Failed to fetch user data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextCursor) {
      fetchUsers(nextCursor);
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (cursorHistory.length > 0) {
      // Get the previous cursor (last item in history)
      const prevCursor = cursorHistory[cursorHistory.length - 1];
      
      // Remove the last cursor from history (since we're going back)
      const newHistory = cursorHistory.slice(0, -1);
      
      fetchUsers(prevCursor, true);
      setCursorHistory(newHistory);
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await apiBaseUrl.delete(`/admin/users/${id}`);
        console.log(response);
        Swal.fire(
          'Deleted!',
          response.data.message,
          'success'
        );
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete user',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Manage Users
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 font-semibold">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden">
                      <img 
                        src={user.profilePicture?.url || '/default-avatar.png'} 
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-avatar.png';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 
                                 transition-colors duration-200 p-2 rounded-full 
                                 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete User"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between items-center p-4">
            <button 
              onClick={handlePrevPage} 
              disabled={cursorHistory.length === 0}
              className={`px-4 py-2 rounded-lg ${
                cursorHistory.length > 0 
                  ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              Previous
            </button>
            
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage}
            </span>
            
            <button 
              onClick={handleNextPage} 
              disabled={!nextCursor}
              className={`px-4 py-2 rounded-lg ${
                nextCursor 
                  ? "bg-customBlue text-white hover:bg-blue-600 cursor-pointer" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;