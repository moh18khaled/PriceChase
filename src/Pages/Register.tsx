import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import mymage from "../assets/images/register&login.png"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {faLock,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "../validation"
import { Link } from "react-router-dom"

const Register = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });
  const onSubmit = (data: any) => console.log(data);
   
  // to make the passord visible or not visible
  const [isVisible, setIsVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="shadow-md dark:bg-gray-700 dark:text-white lg:h-screen w-full max-w-screen-2xl   gap-3 bg-customBlue lg:flex md:flex">
      <div className="">
        <FontAwesomeIcon icon={faCartShopping} className="w-10 h-10 p-5 text-white" />
      <h1 className="lg:pl-16 lg:pt-8 pl-10 pt-5 text-white text-[40px] font-semibold h-12 text-center">Welcome To <span className="block lg:text-6xl lg:h-[72px] text-5xl text-center">PriceChase</span></h1>\
      <img src={mymage} alt="" className="lg:mt-16 mt-10 mx-auto " />
      </div>
      <div className="shadow-md  dark:bg-gray-900 dark:text-white w-full max-w-[960px]  bg-white rounded-tl-[40px] rounded-tr-[40px] ml-auto lg:rounded-tl-[40px] lg:rounded-bl-[40px] lg:rounded-tr-none md:rounded-tr-none ">
        <h1 className="pt-10 font-bold lg:text-[40px] text-[30px] text-center mb-4">Create Account</h1>
        <form action="" className="w-4/5 mx-auto space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            <div className=" lg:flex  lg:space-x-3 lg:space-y-0 space-y-3">
            <div className="flex flex-1 flex-col ">
            <label htmlFor="first-name" className="font-medium">First Name :</label>
            <input type="text" id="first-name" {...register("firstName")} className="h-12 border-[1px] border-gray-600 rounded-md pl-4 focus:outline-none focus:border-[2px] focus:border-customBlue" />
            <p className="block text-red-700 font-semibold text-sm">{errors.firstName?.message}</p>
            </div>
            <div className="flex flex-1 flex-col  ">
            <label htmlFor="last-name"  className="font-medium">Last Name :</label>
            <input type="text" id="last-name" {...register("lastName")} className="h-12 border-[1px] border-gray-600 rounded-md pl-4 focus:outline-none focus:border-[2px] focus:border-customBlue" />
            <p className="block text-red-700 font-semibold text-sm">{errors.lastName?.message}</p>
            </div>
            </div>
            
            <div className="flex flex-col   space-y-1 relative">
                <label htmlFor="email"  className="font-medium">Email :</label>
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-10 w-5 h-5 dark:text-gray-900" />
                <input type="email" {...register("email")} className="h-12 border-[1px] border-gray-600 rounded-md pl-12 focus:outline-none focus:border-[2px] focus:border-customBlue "/>
                <p className="block text-red-700 font-semibold text-sm">{errors.email?.message}</p>
            </div>
            <div className=" lg:flex  lg:space-x-3 lg:space-y-0 space-y-3">
            <div className="flex flex-1 flex-col  space-y-1 relative">
            <label htmlFor="first-name" className="font-medium">Password :</label>
            <FontAwesomeIcon icon={faLock} className="absolute left-4 top-9 w-5 h-5 dark:text-gray-900" />
            <FontAwesomeIcon icon={isVisible?faEyeSlash :faEye} onClick={togglePasswordVisibility} className="absolute right-4 top-9 w-5 h-5 dark:text-gray-900" />
            <input type={isVisible? "text" : "password"} id="first-name" {...register("password")} className="h-12 pl-12 border-[1px] border-gray-600 rounded-md  focus:outline-none focus:border-[2px] focus:border-customBlue" />
            <p className="block text-red-700 font-semibold text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex flex-1 flex-col  space-y-1 relative">
            <label htmlFor="last-name" className="font-medium">Confirm Password :</label>
            <FontAwesomeIcon icon={faLock} className="absolute left-4 top-9 w-5 h-5 cursor-pointer dark:text-gray-900" />
            <FontAwesomeIcon icon={isVisible?faEyeSlash :faEye} onClick={togglePasswordVisibility} className="absolute right-4 top-9 w-5 h-5 cursor-pointer dark:text-gray-900" />
            <input type={isVisible? "text" : "password"} id="last-name" {...register("confirmPassword")} className="h-12 border-[1px] border-gray-600 rounded-md pl-12 focus:outline-none focus:border-[2px] focus:border-customBlue" />
            <p className="block text-red-700 font-semibold text-sm">{errors.confirmPassword?.message}</p>
            </div>
            
            </div>
            <div>
            <button className="bg-customBlue  w-full rounded-md text-white font-medium mt-5  p-3 ">Create Account</button>
            <h3 className="mt-2">Already have an an account? <Link className="text-customBlue font-medium cursor-pointer" to={"/login"}>Sign in</Link></h3>
        </div>
        </form>
        
      </div>
    </div>
  )
}

export default Register
