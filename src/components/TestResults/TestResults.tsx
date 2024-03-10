import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { backgroundImage } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';

const TestResults: React.FC = () => {
    const [tests, setTests] = useState<any[]>([]);
    const [testResults, setTestResults] = useState<any[]>([]);
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

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await fetch(`http://localhost:5214/api/Tests/get-tests-list`);
            if (!response.ok) {
                throw new Error('Failed to fetch tests');
            }
            const data = await response.json();
            setTests(data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const fetchTestResults = async () => {
        try {
            const requestBody = {
                UserId: id,
                Role: roles
            };
            const response = await fetch('http://localhost:5214/api/Tests/get-tests-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch test results');
            }
            const data = await response.json();
            setTestResults(data);
        } catch (error) {
            console.error('Error fetching test results:', error);
        }
    };

    const handleFetchTestResults = () => {
        fetchTestResults();
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
            <div className="py-8 w-[70%] mx-auto">
                <h2 className="text-[3rem] font-semibold text-white mb-4 text-center font-workSans">Tests:</h2>
                <table className="min-w-full divide-y divide-gray-200 font-montserrat">
                    <thead>
                        <tr>
                            <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Test ID</th>
                            <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Test Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100 divide-y divide-gray-200">
                        {tests.map((test: any, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{test.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{test.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="block mx-auto mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleFetchTestResults}>Fetch Test Results</button>
            {testResults.length > 0 && (
                <div className="py-8 w-[70%] mx-auto">
                    <h2 className="text-[3rem] font-semibold text-white mb-4 text-center font-workSans">Test Results:</h2>
                    <table className="min-w-full divide-y divide-gray-200 font-montserrat">
                        <thead>
                            <tr>
                                <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Test ID</th>
                                <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Test Name</th>
                                <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Child Name</th>
                                <th className="bg-gray-800 text-white uppercase font-semibold text-sm px-6 py-3">Teacher Feedback</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-100 divide-y divide-gray-200">
                            {testResults.map((result: any, index: number) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{result.testId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{result.testName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{result.childName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{result.teacherFeedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TestResults;
