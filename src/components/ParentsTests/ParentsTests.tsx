import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';


const ParentsTests : React.FC = () => {
  const storedUserData = localStorage.getItem('loggedInUserData');
  const { email, roles } = storedUserData ? JSON.parse(storedUserData) : { email: '', roles: '' };
  const [selectedChild, setSelectedChild] = useState<number | undefined>(undefined);
  const [links, setLinks] = useState<any[]>([]);
  const [children, setChildren] = useState<any[]>([]);
  
  useEffect(() => {
      if (roles === 0) {
          setLinks(TeacherLinks);
      } else if (roles === 1) {
          setLinks(ParentLinks);
      }
  }, [roles]);

  useEffect(() => {
      fetchChildren();
  }, []);

  const fetchChildren = async () => {
      try {
          const response = await fetch(`http://localhost:5214/api/Tests/get-childs-list`);
          if (!response.ok) {
              throw new Error('Failed to fetch children');
          }
          const data = await response.json();
          setChildren(data);
      } catch (error) {
          console.error('Error fetching children:', error);
      }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          if (selectedChild !== undefined) {
              const response = await fetch('http://localhost:5214/api/Tests/child-suggestion', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(selectedChild),
              });
              if (!response.ok) {
                  throw new Error('Failed to submit suggestion');
              }
              console.log('Child suggestion submitted successfully');
          } else {
              console.error('Please select a child');
          }
      } catch (error) {
          console.error('Error submitting child suggestion:', error);
      }
  };

  const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedChildId = parseInt(e.target.value);
      setSelectedChild(selectedChildId);
  };
  
  
  return (
      <div className="min-h-screen bg-cover bg-center pb-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="bg-bluePurple border-b-2 border-black border-opacity-20 font-montserrat" style={{ backgroundImage: `url(${backgroundImage})` }}>
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FaChalkboardTeacher className='text-white cursor-pointer' />
                      <div className="self-center text-2xl font-semibold whitespace-nowrap text-white">iTeach</div>
                  </a>
                  <div className="hidden w-full md:block md:w-auto">
                      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          {links.map((link, index) => (
                              <li key={index}>
                                  <a href={link.href} className="block py-2 px-3 text-white md:hover:text-bluePurple md:p-0">{link.title}</a>
                              </li>
                          ))}
                          <li>
                              <a href="/teach-room" className="block py-2 px-3 text-white md:hover:text-bluePurple md:p-0">{email}</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          
      </div>
  )
}

export default ParentsTests