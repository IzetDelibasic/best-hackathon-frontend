import React, { useState, useEffect } from 'react';
// - Icons -
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage, avatarIcon } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';

const TeachRoom: React.FC = () => {
  const storedUserData = localStorage.getItem('loggedInUserData');
  const { email, id, roles } = storedUserData ? JSON.parse(storedUserData) : { email: '', id: '', roles: '' };

  const [links, setLinks] = useState<any[]>([]); 

  useEffect(() => {
    if (roles === 0) {
      setLinks(TeacherLinks);
    } else if (roles === 1) {
      setLinks(ParentLinks);
    }
  }, [roles]);

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="bg-bluePurple border-b-2 border-black border-opacity-20" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <FaChalkboardTeacher className='text-white cursor-pointer' />
            <div className="self-center text-2xl font-semibold whitespace-nowrap text-white">iTeach</div>
          </a>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0">{link.title}</a>
                </li>
              ))}
              <li>
                <a href="/teach-room" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0">{email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="xl:w-[40%] lg:w-[45%] w-[70%]  mx-auto shadow-lg rounded-[0.5rem] overflow-hidden p-[5rem] mt-[12rem] border-white border-[1px]" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex flex-col md:flex-row md:justify-between justify-center items-center">
            <div className="md:flex-shrink-0">
                <img className="md:h-[12rem] w-full object-cover md:w-[12rem]" src={avatarIcon} alt="Profile" />
            </div>
            <div className="p-[2rem] md:text-start text-center">
                <div className="uppercase tracking-wide text-bluePurple font-medium font-workSans text-[1.2rem]">Profile</div>
                <p className="mt-2 text-white font-montserrat">ID: {id}</p>
                <p className="mt-2 text-white font-montserrat">Role: {roles === 0 ? 'Teacher' : 'Parent'}</p>
                <p className="mt-2 text-white font-montserrat">Email: {email}</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default TeachRoom;
