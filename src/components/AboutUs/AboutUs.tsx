// - Constants -
import { backgroundImage } from "../../constants/ImagesConstants";
import aboutUsData from "../../constants/AboutConstant";

const AboutUs = () => {
  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col justify-center items-center mx-auto py-[2.5rem] bg-white xl:w-[50%] lg:w-[75%] w-[90%] pt-[4rem]">
        <h1 className="text-[3rem] font-bold text-center mt-0 mb-[1.5rem] font-workSans">{aboutUsData.title}</h1>
        <div className="w-[90%] mx-auto text-[1.2rem] text-black font-montserrat">
          {aboutUsData.content}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
