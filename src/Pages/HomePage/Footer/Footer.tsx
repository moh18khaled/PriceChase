import { Link } from "react-router-dom"
import { footerLinks, mainFooterLinks } from "./data"

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container">
        <div className="w-4/5 mx-auto pb-40 grid md:grid-cols-3">
            {/* PriceChase */}
            <div className="text-3xl font-bold mt-8">
                <Link to = "/" className="py-8">Price<span className="text-customBlue">Chase</span></Link>
            </div>
            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                {/* Important Links */}
                <div>
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Important Links</h1>
                        <ul>
                            {footerLinks.map(({title,link},i)=>(
                                <li key={i} className="py-2 hover:translate-x-1 duration-300 text-gray-200">
                                    <Link className="hover:text-customBlue transition duration-200" to={link}>{title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Other Links */}
                <div className="ml-12">
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Links</h1>
                        <ul>
                            {mainFooterLinks.map(({title,link},i)=>(
                                <li key={i} className="py-2 hover:translate-x-1 duration-300 text-gray-200">
                                    <a className="hover:text-customBlue transition duration-200" href={link}>{title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
