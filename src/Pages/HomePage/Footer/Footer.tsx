import { Link } from "react-router-dom"
import { footerLinks, mainFooterLinks } from "./data"

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {/* PriceChase Logo - Made more compact */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold hover:text-customBlue transition duration-200">
              Price<span className="text-customBlue">Chase</span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              Your trusted price comparison platform
            </p>
          </div>

          {/* Footer Links - Made more compact */}
          <div className="grid grid-cols-2 gap-8 md:col-span-3">
            {/* Important Links */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Important Links</h2>
              <ul className="space-y-2">
                {footerLinks.map(({title, link}, i) => (
                  <li key={i}>
                    <Link 
                      to={link}
                      className="text-gray-300 hover:text-customBlue text-sm transition duration-200"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Links</h2>
              <ul className="space-y-2">
                {mainFooterLinks.map(({title, link}, i) => (
                  <li key={i}>
                    <a
                      href={link}
                      className="text-gray-300 hover:text-customBlue text-sm transition duration-200"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright - Added at the bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} PriceChase. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer