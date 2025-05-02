import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const AdminDashboard = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
      <Sidebar />
      <div className="ml-20 lg:ml-64 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
