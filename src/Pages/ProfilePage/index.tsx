import Footer from "../HomePage/Footer/Footer"
import Navbar from "../HomePage/Navbar/Navbar"
import ProfileDetails from "./ProfileDetails"
import YourWishlist from "./YourWishlist"

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <ProfileDetails />
      <YourWishlist />
      <Footer />
    </div>
  )
}

export default ProfilePage
