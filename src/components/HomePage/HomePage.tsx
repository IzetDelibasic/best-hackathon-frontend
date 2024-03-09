// - Constants -
import { homePageWallpaper, backgroundImage } from "../../constants/ImagesConstants";
// - Components -
import HomePageAction from "../HomePageAction/HomePageAction";


const HomePage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col justify-center items-center pt-[8rem]">
        <div className="xl:text-[3rem] text-[1.5rem] text-center mb-[1rem] font-montserrat text-bluePurple font-medium">Creating Smiles, Building Futures</div>
        <div className="lg:w-[45%] w-[90%] relative bg-bluePurple bg-opacity-20 mb-[1rem]">
          <img className="w-full h-full border-white border-[0.3rem]" src={homePageWallpaper} alt="Header Logo" />
        </div>
        <HomePageAction />
      </div>
    </div>
  );
}

export default HomePage;
