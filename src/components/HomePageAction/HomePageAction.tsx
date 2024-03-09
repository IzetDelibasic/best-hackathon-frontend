// - Components -
import Button from '../CustomButton/Button'
// - Icons -
import { FaArrowRight } from "react-icons/fa";

const HomePageAction = () => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:w-[30rem] lg:w-[40rem] w-[90%] mx-auto md:mx-0">
          <Button
            className="relative bg-blue-950 text-black font-medium lg:py-[1.6rem] py-[1rem] lg:px-[2.5rem] px-[3.5rem] md:px-[1rem] mr-0 mb-[20px] md:mb-0  rounded-[3rem] group overflow-hidden z-[1]"
            iconClassName="group-hover:text-white ml-[10px]"
            title="About Us"
            titleClassName="group-hover:text-white font-subtitle"
            href="/contact"
            Icon={FaArrowRight}
            >
            <div className="absolute inset-0 bg-neutral-100 w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
          </Button>
        <Button
          className="relative bg-red-600 text-black font-medium lg:py-[1.6rem] py-[1rem] lg:px-[2rem] px-[5rem] md:px-[1rem] rounded-[3rem] group overflow-hidden z-[1] md:ml-[20px] hover:border-opacity-0 hover:border-transparent"
          iconClassName=""
          title="Login / Register"
          titleClassName="group-hover:text-white font-subtitle"
        >
          <div className="absolute inset-0 bg-neutral-100 w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
        </Button>
    </div>
  )
}

export default HomePageAction