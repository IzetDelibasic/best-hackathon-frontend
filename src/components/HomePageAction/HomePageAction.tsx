// - React -
import { Link } from 'react-router-dom';
// - Components -
import Button from '../CustomButton/Button'
// - Icons -
import { FaArrowRight } from "react-icons/fa";

const HomePageAction = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:w-[30rem] lg:w-[40rem] w-[90%] mx-auto md:mx-0">
        <Link to="/about">
            <Button
            className="relative bg-blue-950 text-black font-medium lg:py-[1.6rem] py-[1rem] lg:px-[2.5rem] px-[6rem] md:px-[1rem] mr-0 mb-[20px] md:mb-0  rounded-[3rem] group overflow-hidden z-[1]"
            iconClassName="group-hover:text-white ml-[10px]"
            title="About Us"
            titleClassName="group-hover:text-white font-montserrat"
            Icon={FaArrowRight}
            >
            <div className="absolute inset-0 bg-neutral-100 w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
            </Button>
        </Link>
        <Link to="/login">
            <Button
            className="relative bg-red-600 text-black font-medium lg:py-[1.6rem] py-[1rem] lg:px-[2rem] px-[5rem] md:px-[1rem] rounded-[3rem] group overflow-hidden z-[1] md:ml-[20px] hover:border-opacity-0 hover:border-transparent"
            iconClassName=""
            title="Login / Register"
            titleClassName="group-hover:text-white font-montserrat"
            >
            <div className="absolute inset-0 bg-neutral-100 w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
            </Button>
        </Link>
    </div>
  )
}

export default HomePageAction