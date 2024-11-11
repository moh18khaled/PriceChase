import { dropDownLinksBoy, dropDownLinksGirl, dropDownLinksMen, dropDownLinksWomen } from './Menu'

const DownNavbar = () => {
  return (
    <div className="bg-[#F5F5F5] shadow-lg dark:bg-gray-700">
      <div className="container">
        <div className="w-4/5 mx-auto pb-40 grid md:grid-cols-3">
            
            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 col-span-5 md:pl-10 ">
                {/* Men Links */}
                <div>
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Men</h1>
                        <ul>
                            {dropDownLinksMen.map(({name,link,id})=>(
                                <li key={id} className="py-2 hover:translate-x-1 duration-300">
                                    <a className="hover:text-customBlue transition duration-200" href={link}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Women Links */}
                <div className="ml-12">
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Women</h1>
                        <ul>
                            {dropDownLinksWomen.map(({name,link,id})=>(
                                <li key={id} className="py-2 hover:translate-x-1 duration-300">
                                    <a className="hover:text-customBlue transition duration-200" href={link}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                    {/* boys links */}
                <div className="ml-12">
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Boys</h1>
                        <ul>
                            {dropDownLinksBoy.map(({name,link,id})=>(
                                <li key={id} className="py-2 hover:translate-x-1 duration-300">
                                    <a className="hover:text-customBlue transition duration-200" href={link}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                            {/* girls links */}
                <div className="ml-12">
                    <div className="py-8 px-4">
                        <h1 className="sm:text-2xl text-xl font-bold sm:text-left text-justify mb-3">Girls</h1>
                        <ul>
                            {dropDownLinksGirl.map(({name,link,id})=>(
                                <li key={id} className="py-2 hover:translate-x-1 duration-300">
                                    <a className="hover:text-customBlue transition duration-200" href={link}>{name}</a>
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

export default DownNavbar
