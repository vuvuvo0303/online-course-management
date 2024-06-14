import { Rate } from 'antd';
import { TeamOutlined, FileWordOutlined } from '@ant-design/icons';

const Info = () => {

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <div className="flex items-center mb-4">
                    <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="Jose Portilla" className="rounded-full w-20 h-20 mr-4" />
                    <div>
                        <h3 className="text-xl font-bold">Jose Portilla</h3>
                        <p className="text-gray-600">Head of Data Science at Pierian Training</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <Rate allowHalf defaultValue={5} />
                        <span className="ml-2">4,6 (instructor ratings)</span>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <TeamOutlined />
                        <span className="ml-2">3.890.836 students</span>
                    </div>
                    <div>
                        <span className="text-gray-500">
                            <FileWordOutlined className='ml-[3rem]' /> 86 lectures
                        </span>
                    </div>
                </div>
                <p className="mb-6 text-gray-700">
                    Jose Marcial Portilla has a BS and MS in Mechanical Engineering from Santa Clara University and years of experience as a professional instructor and trainer for Data Science, Machine Learning and Python Programming. He has publications and patents in various fields such as microfluidics, materials science, and data science. Over the course of his career he has developed a skill set in analyzing data and he hopes to use his experience in teaching and data science to help other people learn the power of programming, the ability to analyze data, and the skills needed to present the data in clear and beautiful visualizations. Currently he works as the Head of Data Science for Pierian Training and provides in-person data science and python programming.
                </p>
            </div>
        </div>
    );
}

export default Info;
