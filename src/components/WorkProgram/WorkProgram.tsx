import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';
import WorkProgramConstant from '../../constants/WorkProgramConstant';

const WorkProgram: React.FC = () => {
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
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
            <div className="mx-auto mt-[5rem] w-[80%]" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <table className="table-auto border-collapse border border-gray-800" >
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-800 text-white font-montserrat">Subject</th>
                            <th className="px-4 py-2 bg-gray-800 text-white font-montserrat">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(WorkProgramConstant[0]).map(([key, value]) => (
                            <tr key={key}>
                                <td className="border px-[2rem] py-[1rem] text-white font-montserrat">{value.subject}</td>
                                <td className="border px-[2rem] py-[1rem] text-white font-montserrat">{value.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WorkProgram;
