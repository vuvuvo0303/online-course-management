
const AboutCourse: React.FC = () => {
    return (
        <div className="bg-white text-black p-6">
            <div className="container mx-auto">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>Have a computer with Internet</li>
                        <li>Be ready to learn an insane amount of awesome stuff</li>
                        <li>Prepare to build real web apps!</li>
                    </ul>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-yellow-500 mb-4">Just updated to include Bootstrap 4.1.3!</p>
                    <p className="mb-4">
                        Hi! Welcome to the Web Developer Bootcamp, the <strong>only course you need to learn web development</strong>.
                        There are a lot of options for online developer training, but this course is without a doubt the most
                        comprehensive and effective on the market. Here's why:
                    </p>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>This is the only online course taught by a professional bootcamp instructor.</li>
                        <li>94% of my in-person bootcamp students go on to get full-time developer jobs. Most of them are complete beginners when I start working with them.</li>
                        <li>The previous 2 bootcamp programs that I taught cost $14,000 and $21,000. This course is just as comprehensive but with brand new content for a fraction of the price.</li>
                        <li>Everything I cover is up-to-date and relevant to today's developer industry. No PHP or other dated technologies. This course does not cut any corners.</li>
                        <li>This is the only complete beginner full-stack developer course that covers NodeJS.</li>
                        <li>We build 13+ projects, including a gigantic production application called YelpCamp. No other course walks you through the creation of such a substantial application.</li>
                        <li>The course is constantly updated with new content, projects, and modules. Think of it as a subscription to a never-ending supply of developer training.</li>
                    </ul>
                    <p className="mt-4">
                        When you're learning to program you often have to sacrifice learning the exciting and current technologies in
                        favor of the "beginner friendly" classes. With this course, you get the best of both worlds. This is a course
                        designed for the complete beginner, yet it covers some of the most exciting and relevant topics in the industry.
                    </p>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Tools and Technologies</h2>
                    <ul className="list-disc ml-5 space-y-2 columns-2">
                        <li>HTML5</li>
                        <li>CSS3</li>
                        <li>JavaScript</li>
                        <li>Bootstrap 4</li>
                        <li>SemanticUI</li>
                        <li>DOM Manipulation</li>
                        <li>jQuery</li>
                        <li>Unix(Command Line) Commands</li>
                        <li>NodeJS</li>
                        <li>NPM</li>
                        <li>ExpressJS</li>
                        <li>REST</li>
                        <li>MongoDB</li>
                        <li>Database Associations</li>
                        <li>Authentication</li>
                        <li>PassportJS</li>
                        <li>Authorization</li>
                    </ul>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Who this course is for:</h2>
                    <ul className="list-disc ml-5 space-y-2">
                        <li>This course is for anyone who wants to learn about web development, regardless of previous experience</li>
                        <li>It's perfect for complete beginners with zero experience</li>
                        <li>It's also great for anyone who does have some experience in a few of the technologies (like HTML and CSS) but not all</li>
                        <li>If you want to take ONE COURSE to learn everything you need to know about web development, take this course</li>
                    </ul>
                </div>

                <div className="bg-white-transparent mb-10 border-gray-300 p-4">
                    <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ul className="list-disc ml-5 space-y-2">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Donec ultricies elit porttitor, ultrices enim a, commodo dolor.</li>
                            <li>Nunc dapibus ligula sed justo porta, id volutpat odio iaculis.</li>
                            <li>Maecenas pharetra mi quis nisl mollis, molestie imperdiet lorem molestie.</li>
                            <li>Maecenas ultricies felis in pulvinar blandit.</li>
                            <li>Praesent ac libero consequat, efficitur tortor et, interdum sem.</li>
                            <li>Nullam non lacus nibh. Etiam et fringilla neque, ut vulputate sapien.</li>
                            <li>Phasellus ultrices tellus sed volutpat vestibulum. Curabitur aliquet dictum leo non congue.</li>
                        </ul>
                        <ul className="list-disc ml-5 space-y-2">
                            <li>In hac habitasse platea dictumst. Aenean vel fermentum neque.</li>
                            <li>Suspendisse semper feugiat urna dictum interdum.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Donec ultricies elit porttitor, ultrices enim a, commodo dolor.</li>
                            <li>Nunc dapibus ligula sed justo porta, id volutpat odio iaculis.</li>
                            <li>Maecenas pharetra mi quis nisl mollis, molestie imperdiet lorem molestie.</li>
                            <li>Maecenas ultricies felis in pulvinar blandit.</li>
                            <li>Praesent ac libero consequat, efficitur tortor et, interdum sem.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutCourse;
