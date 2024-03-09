// - Constants -
import { homePageWallpaper, backgroundImage } from "../../constants/ImagesConstants";
// - Components -
import HomePageAction from "../HomePageAction/HomePageAction";


const HomePage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col justify-center items-center pt-[10rem]">
        <div className="lg:w-[45%] w-[90%] relative">
          <img className="w-full h-full border-white border-[0.3rem] mb-[1rem]" src={homePageWallpaper} alt="Header Logo" />
        </div>
        <HomePageAction />
      </div>
    </div>
  );
}

export default HomePage;
