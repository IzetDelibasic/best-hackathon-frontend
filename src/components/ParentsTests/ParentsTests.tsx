// - React -
import React, { useState, useEffect } from 'react';
// - Icons -
import { FaChalkboardTeacher } from "react-icons/fa";
// -Constants -
import { backgroundImage } from '../../constants/ImagesConstants';
import { TeacherLinks } from '../../constants/TeacherLinks';
import { ParentLinks } from '../../constants/ParentLinks';

const ParentsTests: React.FC = () => {
    const [tests, setTests] = useState<any[]>([]);
    const [children, setChildren] = useState<any[]>([]);
    const [selectedTest, setSelectedTest] = useState<number | undefined>(undefined);
    const [selectedChild, setSelectedChild] = useState<number | undefined>(undefined);
    const [teacherFeedback, setTeacherFeedback] = useState<string>('');
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
        fetchChildren();
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
    

    const handleTestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTestId = parseInt(e.target.value);
        setSelectedTest(selectedTestId);
    };

    const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChildId = parseInt(e.target.value);
        setSelectedChild(selectedChildId);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedTest !== undefined && selectedChild !== undefined && teacherFeedback.trim() !== '') {
            try {
                const requestBody = {
                    ChildId: selectedChild,
                    TestId: selectedTest,
                    TeacherFeedback: teacherFeedback
                };
                const response = await fetch('http://localhost:5214/api/Tests/teacher-feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (!response.ok) {
                    throw new Error('Failed to submit feedback');
                }
                console.log('Feedback submitted successfully');
            } catch (error) {
                console.error('Error submitting feedback:', error);
            }
        } else {
            console.error('Please select a test, a child, and provide feedback');
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
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
        <div className="flex flex-col justify-center items-center mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center md:flex-row ">
                <select
                    value={selectedTest}
                    onChange={handleTestChange}
                    className="w-[25%] bg-gray-800 text-white border-none rounded-lg px-4 py-3"
                >
                    <option value="">Select Test</option>
                    {tests.map((test: any) => (
                        <option key={test.id} value={test.id}>{test.name}</option>
                    ))}
                </select>
                <select
                    value={selectedChild}
                    onChange={handleChildChange}
                    className="w-[25%] bg-gray-800 text-white border-none rounded-lg px-4 py-3"
                >
                    <option value="">Select Child</option>
                    {children.map((child: any) => (
                        <option key={child.id} value={child.id}>{child.childName}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    placeholder="Feedback" 
                    value={teacherFeedback} 
                    onChange={(e) => setTeacherFeedback(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-bluePurple w-[30%]" 
                />
                <button type="submit" className="px-4 py-2 bg-bluePurple hover:bg-galaxy ease-in-out duration-300 text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80">Submit</button>
            </form>
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

    </div>
    );
}

export default ParentsTests;
