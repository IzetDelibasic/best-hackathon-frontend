import React from 'react';
// - Icons -
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';

const TeachRoom: React.FC = () => {
  const storedUserData = localStorage.getItem('loggedInUserData');
  const { email, id, role } = storedUserData ? JSON.parse(storedUserData) : { email: '', id: '', role: '' };

  return (
    <div>
      <div className="bg-bluePurple border-gray-200 dark:bg-gray-900" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <FaChalkboardTeacher className='text-white cursor-pointer' />
            <div className="self-center text-2xl font-semibold whitespace-nowrap text-white">iTeach</div>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-bluePurple md:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0 ">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0 ">{email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p>Email: {email}</p>
      <p>ID: {id}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default TeachRoom;
