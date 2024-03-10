import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';

const Childs: React.FC = () => {
    const storedUserData = localStorage.getItem('loggedInUserData');
    const { email, id: parentId, roles } = storedUserData ? JSON.parse(storedUserData) : { email: '', id: '', roles: '' };

    const [links, setLinks] = useState<any[]>([]);
    const [childName, setChildName] = useState('');
    const [childSurname, setChildSurname] = useState('');
    const [selectedParent, setSelectedParent] = useState<any | undefined>(undefined); // Explicitly set the type
    const [parents, setParents] = useState<any[]>([]);
    const [children, setChildren] = useState<any[]>([]);

    useEffect(() => {
        if (roles === 0) {
            setLinks(TeacherLinks);
            fetchParents();
            fetchChildren();
        } else if (roles === 1) {
            setLinks(ParentLinks);
        }
    }, [roles]);

    const fetchParents = async () => {
        try {
            const response = await fetch(`http://localhost:5214/api/User/get-parents`);
            if (!response.ok) {
                throw new Error('Failed to fetch parents');
            }
            const data = await response.json();
            setParents(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchChildren = async () => {
        try {
            const response = await fetch(`http://localhost:5214/api/Tests/get-childs-list`);
            if (!response.ok) {
                throw new Error('Failed to fetch children');
            }
            const data = await response.json();
            setChildren(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    fetchChildren();

    const handleChildSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const storedUserData = localStorage.getItem('loggedInUserData');
            const { id: teacherId } = storedUserData ? JSON.parse(storedUserData) : { id: '' };

            const response = await fetch('http://localhost:5214/api/User/child-add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parentId: selectedParent?.id,
                    childName,
                    childSurname,
                    teacherId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add child');
            }

            setChildName('');
            setChildSurname('');
            setSelectedParent(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
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

            {roles === 0 && (
                <div className="flex justify-center items-center mt-[5rem]">
                    <form onSubmit={handleChildSubmit} className="flex flex-col md:flex-row justify-between items-center w-[60%] border-white border-2 p-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
                        <select
                            value={selectedParent?.id}
                            onChange={(e) => setSelectedParent(parents.find(parent => parent.id == e.target.value))}
                            className="w-[25%] bg-gray-800 text-white border-none rounded-lg px-4 py-3 mb-2"
                        >
                            <option value="">Select Parent</option>
                            {parents.map((parent: any) => (
                                <option key={parent.id} value={parent.id}>{parent.nameMail}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Child's Name"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            className="w-[25%] bg-gray-800 text-white border-none rounded-lg px-4 py-3 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Child's Surname"
                            value={childSurname}
                            onChange={(e) => setChildSurname(e.target.value)}
                            className="w-[25%] bg-gray-800 text-white border-none rounded-lg px-4 py-3 mb-2"
                        />
                        <button type="submit" className="bg-bluePurple text-white py-3 px-4 rounded-lg hover:bg-galaxy transition-colors duration-300 w-[15%]">Add Child</button>
                    </form>
                </div>
            )}
            <div className="py-8 w-[60%] mx-auto">
                <h2 className="text-[3rem] font-semibold text-white mb-4 text-center font-workSans">Children:</h2>
                <table className="min-w-full divide-y divide-gray-200 font-montserrat">
                    <thead>
                        <tr>
                            <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Id</th>
                            <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100 divide-y divide-gray-200">
                        {children.map((child: any, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{child.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{child.childName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        </div>
    );
}

export default Childs;
