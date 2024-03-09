// - Constants -
import { backgroundImage } from "../../constants/ImagesConstants";
import aboutUsData from "../../constants/AboutConstant";
// - Icons -
import { FaHome } from "react-icons/fa";
// - React -
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col mx-auto py-[2.5rem] rounded-[1rem] rounded-br-none hover:rounded-br-[1rem] ease-in-out duration-300 bg-white hover:bg-opacity-90 xl:w-[50%] lg:w-[75%] w-[90%] md:pt-[4rem]">
        <div className="text-[3rem] font-bold text-center mt-0 mb-[1.5rem] font-workSans">{aboutUsData.title}</div>
        <div className="w-[90%] mx-auto text-[1.2rem] text-black font-montserrat">
          {aboutUsData.content}
        </div>
        <Link to="/">
            <div className="flex items-center pl-[2.5rem] pt-[1rem] cursor-pointer group">
            <FaHome className="w-[2rem] h-[2rem] transition-all duration-300 ease-in-out mr-[0.5rem]" />
            <div className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 font-montserrat z-10">Back to Home</div>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
