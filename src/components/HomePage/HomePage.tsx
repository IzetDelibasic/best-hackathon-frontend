// - Constants -
import { homePageWallpaper, backgroundImage } from "../../constants/ImagesConstants";

const HomePage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col justify-center items-center">
        <img className="w-[45%]" src={homePageWallpaper} alt="Header Logo" />
        <p className="text-xl font-bold">HomePage</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Button 1</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Button 2</button>
      </div>
    </div>
  );
}

export default HomePage;


