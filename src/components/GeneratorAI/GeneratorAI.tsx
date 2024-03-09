import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';
import { ParentLinks } from "../../constants/ParentLinks";
import { TeacherLinks } from "../../constants/TeacherLinks";

const GeneratorAI : React.FC = () => {
    const storedUserData = localStorage.getItem('loggedInUserData');
    const { email, id, roles } = storedUserData ? JSON.parse(storedUserData) : { email: '', id: '', roles: '' };

    const [links, setLinks] = useState<any[]>([]);
    const [subject, setSubject] = useState('');
    const [prompt, setPrompt] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (roles === 0) {
            setLinks(TeacherLinks);
        } else if (roles === 1) {
            setLinks(ParentLinks);
        }
    }, [roles]);

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };

    const handleGenerateClick = async () => {
        try {
            const requestBody = {
                UserId: id,
                Name: subject,
                Prompt: prompt,
            };
    
            const response = await fetch('http://localhost:5214/api/Tests/create-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setDescription(data.description);
        } catch (error) {
            console.error('Error:', error);
            setDescription('Error occurred while fetching data from server.');
        }
    };
    
    

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
            <div className="w-full mx-auto mt-[2rem] p-[1rem]">
                <div className="flex flex-col items-center justify-center">
                    <input type="text" placeholder="Subject" value={subject} onChange={handleSubjectChange} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-bluePurple mb-4 w-[60%]" />
                    <input type="text" placeholder="Prompt" value={prompt} onChange={handlePromptChange} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-bluePurple mb-4 w-[60%]" />
                    <button onClick={handleGenerateClick} className="px-4 py-2 bg-bluePurple text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80">Generate</button>
                    {description && <p className="mt-4 text-gray-800 bg-white w-[60%] p-[3rem] rounded-[1rem] font-montserrat text-[1.2rem] text-center">{description}</p>}
                </div>
            </div>
        </div>
    )
}

export default GeneratorAI;
