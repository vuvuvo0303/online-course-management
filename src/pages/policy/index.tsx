import { policies } from '../../consts'
import styles from './policy.module.css'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import TermsLayout from '../../layout/terms/TermsLayout'
const Policy: React.FC = () => {

    return (
        <TermsLayout>
            <div className='md:px-0 md:mx-10 px-6 relative'>
                <div className='w-full'>
                    <h1 className={`${styles.title} text-2xl sm:text-4xl`}>Private Policy</h1>
                    <p className='p_line_height mt-3'>
                        <i>This Privacy Policy was last updated on June 6, 2023.</i>
                    </p>
                    <p className='p_line_height mt-3'>
                        Thank you for joining FLearn. We at FLearn (
                        <strong>“FLearn”</strong>,
                        <strong>“we”</strong>,
                        <strong>“us”</strong>,
                        ) respect your privacy and want you to understand how we collect, use, and share data about you. This Privacy Policy covers our data collection practices and describes your rights regarding your personal data.
                    </p>
                    <p className='p_line_height mt-3'>

                        Unless we link to a different policy or state otherwise, this Privacy Policy applies when you visit or use FLearn websites, mobile applications, APIs, or related services (the
                        <strong>“Services”</strong>
                        ). It also applies to prospective customers of our business and enterprise products.
                    </p>

                    <p className='p_line_height mt-3'>
                        <strong>By using the Services, you agree to the terms of this Privacy Policy.</strong>
                        You shouldn’t use the Services if you don’t agree with this Privacy Policy or any other agreement that governs your use of the Services.
                    </p>
                    <div className='mt-3'>
                        <h2 className={`${styles.content} text-xl sm:text-2xl mb-5`}>Table of content</h2>
                        <ul className={styles.text_without_underline}>
                            {policies.map(policy => (
                                <li className={`${styles.list_content}`} key={policy.id}>
                                    <a className={styles.link_to} href={policy.link}>{policy.name}</a>
                                </li>
                            ))}
                        </ul>


                        <h2 id='section1' className={`${styles.content} text-xl sm:text-2xl`}>1. What Data We Get</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                We collect certain data from you directly, like information you enter yourself, data about your consumption of content, and data from third-party platforms you connect with FLearn. We also collect some data automatically, like information about your device and what parts of our Services you interact with or spend time using. All data listed in this section is subject to the following processing activities: collecting, recording, structuring, storing, altering, retrieving, encrypting, pseudonymizing, erasing, combining, and transmitting.</p>
                        </div>

                        <h3 className='main_h3'>1.1 Data You Provide Us</h3>

                        <p className='p_line_height mt-3'>
                            We may collect different data from or about you depending on how you use the Services. Below are some examples to help you better understand the data we collect.</p>

                        <p className='p_line_height mt-3'>
                            When you create an account and use the Services, including through a third-party platform, we collect any data you provide directly, including:</p>

                        <div className={styles.table_container}>
                            <table className={styles.policy_table}>
                                <tbody>
                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Category of Personal Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            <strong>Description</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            <strong>Legal Basis for Processing</strong>
                                        </td>
                                    </tr>
                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Account Data</strong>
                                        </td>
                                        <td className={styles.table_description}>

                                            In order to use certain features (like accessing content), you need to create a user account, which requires us to collect and store your email address, password, and account settings. To create an instructor account, we collect and store your name, email address, password, and account settings. As you use certain features on the site, you may be prompted to submit additional information including occupation, government ID information, verification photo, date of birth, race/ethnicity, skill interests, and phone number. Upon account creation, we assign you a unique identifying number.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>

                                                    Legitimate interests (service provisioning, identity verification, fraud prevention and security, communication)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Profile Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            You can also choose to provide profile information like a photo, headline, biography, language, website link, social media profiles, country, or other data. Your Profile Data will be publicly viewable by others.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (enhanced platform functionality, convey content source information)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Shared Content</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            Parts of the Services let you interact with other users or share content publicly, including by uploading courses and other educational content, posting reviews about content, asking or answering questions, sending messages to students or instructors, or posting photos or other work you upload. Such shared content may be publicly viewable by others depending on where it is posted.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (service provisioning, enhanced platform functionality)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Student Payment Data</strong>
                                        </td>
                                        <td className={styles.table_description}>

                                            If you make purchases, we collect certain data about your purchase (such as your name, billing address, and ZIP code) as necessary to process your order and which may optionally be saved to process future orders. You must provide certain payment and billing data directly to our payment service providers, including your name, credit card information, billing address, and ZIP code. We may also receive limited information, like the fact that you have a new card and the last four digits of that card, from payment service providers to facilitate payments. For security, FLearn does not collect or store sensitive cardholder data, such as full credit card numbers or card authentication data.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (service provisioning, enhanced platform functionality)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Sweepstakes, Promotions, and Surveys</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            We may invite you to complete a survey or participate in a promotion (like a contest, sweepstakes, or challenge), either through the Services or a third-party platform. If you participate, we will collect and store the data you provide as part of participating, such as your name, email address, postal address, date of birth, or phone number. That data is subject to this Privacy Policy unless otherwise stated in the official rules of the promotion or in another privacy policy. The data collected will be used to administer the promotion or survey, including for notifying winners and distributing rewards. To receive a reward, you may be required to allow us to post some of your information publicly (like on a winner’s page). Where we use a third-party platform to administer a survey or promotion, the third party’s privacy policy will apply.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (service provisioning, enhanced platform functionality)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Communications and Support</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            If you contact us for support or to report a problem or concern (regardless of whether you have created an account), we collect and store your contact information, messages, and other data about you like your name, email address, messages, location, FLearn user ID, refund transaction IDs, and any other data you provide or that we collect through automated means (which we cover below). We use this data to respond to you and research your question or concern, in accordance with this Privacy Policy.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Legitimate interests (customer and technical support)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className='p_line_height mt-3'>The data listed above is stored by us and associated with your account.</p>

                        <h3 className='main_h3'>1.2 Data We Collect through Automated Means</h3>

                        <p className='p_line_height mt-3'>When you access the Services (including browsing content), we collect certain data by automated means, including:</p>


                        <div className={styles.table_container}>
                            <table className={styles.policy_table}>
                                <tbody>
                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Category of Personal Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            <strong>Description</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            <strong>Legal Basis for Processing</strong>
                                        </td>
                                    </tr>
                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>System Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            Technical data about your computer or device, like your IP address, device type, operating system type and version, unique device identifiers, browser, browser language, domain and other systems data, and platform types.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (service provisioning, customer and technical support, fraud prevention and security, communication, product improvement)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Profile Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            You can also choose to provide profile information like a photo, headline, biography, language, website link, social media profiles, country, or other data. Your Profile Data will be publicly viewable by others.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (enhanced platform functionality, convey content source information)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Usage Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            Usage statistics about your interactions with the Services, including content accessed, time spent on pages or the Service, pages visited, features used, your search queries, click data, date and time, referrer, and other data regarding your use of the Services.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Legitimate interests (service provisioning, user experience improvement, product improvement)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>

                                    <tr className={styles.policy_tr}>
                                        <td className={styles.table_description_main}>
                                            <strong>Approximate Geographic Data</strong>
                                        </td>
                                        <td className={styles.table_description}>
                                            An approximate geographic location, including information like country, city, and geographic coordinates, calculated based on your IP address.
                                        </td>
                                        <td className={styles.table_description}>
                                            <ul>
                                                <li className={styles.list_content}>
                                                    Performance of contract
                                                </li>

                                                <li className={styles.list_content}>
                                                    Legitimate interests (user experience improvement, fraud prevention and security, compliance)
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            The data listed above is collected through the use of server log files and tracking technologies, as detailed in the “Cookies and Data Collection Tools” section below. It is stored by us and associated with your account.</p>

                        <h3 className='main_h3'>1.3 Data From Third Parties</h3>

                        <p className='p_line_height mt-3'>
                            If you are a FLearn Business enterprise or corporate prospect, in addition to information you submit to us, we may collect certain business contact information from third-party commercial sources.</p>

                        <h2 id='section2' className={`${styles.content} text-xl sm:text-2xl`}>2. How We Get Data About You</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                We use tools like cookies, web beacons, and similar tracking technologies to gather the data listed above. Some of these tools offer you the ability to opt out of data collection.</p>
                        </div>
                        <h3 className='main_h3'>2.1 Cookies and Data Collection Tools</h3>

                        <p className='p_line_height mt-3'>
                            We use cookies, which are small text files stored by your browser, to collect, store, and share data about your activities across websites, including on FLearn. They allow us to remember things about your visits to FLearn, like your preferred language, and to make the site easier to use. To learn more about cookies, visit
                            <a href="https://cookiepedia.co.uk/all-about-cookies">https://cookiepedia.co.uk/all-about-cookies</a>
                            . We may also use clear pixels in emails to track deliverability and open rates.
                        </p>

                        <p className='p_line_height mt-3'>
                            FLearn and service providers acting on our behalf (like Google Analytics and third-party advertisers) use server log files and automated data collection tools like cookies, tags, scripts, customized links, device or browser fingerprints, and web beacons (together,
                            <strong>“Data Collection Tools“</strong>
                            ) when you access and use the Services. These Data Collection Tools automatically track and collect certain System Data and Usage Data (as detailed in Section 1) when you use the Services. In some cases, we tie data gathered through those Data Collection Tools to other data that we collect as described in this Privacy Policy.
                        </p>

                        <h3 className='main_h3'>2.2 Why We Use Data Collection Tools</h3>

                        <p className='p_line_height mt-3'>
                            FLearn uses the following types of Data Collection Tools for the purposes described:
                        </p>
                        <ul style={{ listStyleType: 'circle', paddingLeft: "1.8rem" }}>
                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>Strictly Necessary:</u> These Data Collection Tools enable you to access the site, provide basic functionality (like logging in or accessing content), secure the site, protect against fraudulent logins, and detect and prevent abuse or unauthorized use of your account. These are required for the Services to work properly, so if you disable them, parts of the site will break or be unavailable.
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>Functional:</u> These Data Collection Tools remember data about your browser and your preferences, provide additional site functionality, customize content to be more relevant to you, and remember settings affecting the appearance and behavior of the Services (like your preferred language or volume level for video playback).
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>Performance:</u> These Data Collection Tools help measure and improve the Services by providing usage and performance data, visit counts, traffic sources, or where an application was downloaded from. These tools can help us test different versions of FLearn to see which features or content users prefer and determine which email messages are opened.
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>Advertising:</u> These Data Collection Tools are used to deliver relevant ads (on the site and/or other sites) based on things we know about you like your Usage and System Data (as detailed in Section 1), and things that the ad service providers know about you based on their tracking data. The ads can be based on your recent activity or activity over time and across other sites and services. To help deliver tailored advertising, we may provide these service providers with a hashed, anonymized version of your email address (in a non-human-readable form) and content that you share publicly on the Services.
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>Social Media:</u> These Data Collection Tools enable social media functionality, like sharing content with friends and networks. These cookies may track a user or device across other sites and build a profile of user interests for targeted advertising purposes.
                            </li>
                        </ul>

                        <p className='p_line_height mt-3'>
                            You can set your web browser to alert you about attempts to place cookies on your computer, limit the types of cookies you allow, or refuse cookies altogether. If you do, you may not be able to use some or all features of the Services, and your experience may be different or less functional. To learn more about managing Data Collection Tools, refer to Section 6.1 (Your Choices About the Use of Your Data) below.</p>
                        <h2 id='section3' className={`${styles.content} text-xl sm:text-2xl`}>3. What We Use Your Data For</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>We use your data to do things like provide our Services, communicate with you, troubleshoot issues, secure against fraud and abuse, improve and update our Services, analyze how people use our Services, serve personalized advertising, and as required by law or necessary for safety and integrity. We retain your data for as long as it is needed to serve the purposes for which it was collected.</p>
                        </div>
                        <p className='p_line_height mt-3'>We use the data we collect through your use of the Services to:</p>

                        <ul style={{ listStyleType: 'disc', paddingLeft: "1.8rem" }}>
                            <li className={styles.policy_li}>
                                Provide and administer the Services, including to facilitate participation in educational content, issue completion certificates, display customized content, and facilitate communication with other users (Account Data; Shared Content; Learning Data; System Data; Usage Data; Approximate Geographic Data);
                            </li>

                            <li className={styles.policy_li}>
                                Process payments to instructors and other third parties (Student Payment Data; Instructor Payment Data);
                            </li>

                            <li className={styles.policy_li}>
                                Process your requests and orders for educational content, products, specific services, information, or features (Account Data; Learning Data; Student Payment Data; System Data; Communications and Support);
                            </li>

                            <li className={styles.policy_li}>
                                Communicate with you about your account by (Account Data; Shared Content; Learning Data; Sweepstakes, Promotions, and Surveys; System Data; Communications and Support):
                                <ul style={{ listStyleType: 'circle', paddingLeft: "1.8rem" }}>
                                    <li className={styles.policy_li}>
                                        Responding to your questions and concerns;
                                    </li>

                                    <li className={styles.policy_li}>
                                        Sending you administrative messages and information, including messages from instructors, students, and teaching assistants; notifications about changes to our Service; and updates to our agreements;
                                    </li>

                                    <li className={styles.policy_li}>
                                        Sending you information, such as by email or text messages, about your progress in courses and related content, rewards programs, new services, new features, promotions, newsletters, and other available instructor-created content (which you can opt out of at any time);
                                    </li>

                                    <li className={styles.policy_li}>
                                        Sending push notifications to your wireless device to provide updates and other relevant messages (which you can manage from the “options” or “settings” page of the mobile app);
                                    </li>
                                </ul>
                            </li>
                            <li className={styles.policy_li}>
                                Manage your account and account preferences and personalize your experience (Account Data; Learning Data; Student Payment Data; Instructor Payment Data; System Data, Usage Data, Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Facilitate the Services’ technical functioning, including troubleshooting and resolving issues, securing the Services, and preventing fraud and abuse (Account Data; Student Payment Data; Instructor Payment Data; Communications and Support; System Data; Approximate Geographic Location);
                            </li>
                            <li className={styles.policy_li}>
                                Verify the identity of instructors (Account Data; Instructor Payment Data);
                            </li>
                            <li className={styles.policy_li}>
                                Solicit feedback from users (Account Data; Communications and Support);
                            </li>
                            <li className={styles.policy_li}>
                                Market products, services, surveys, and promotions (Account Data; Learning Data; Sweepstakes, Promotions, and Surveys; Usage Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Market Subscription Plans to prospective customers (Account Data; Learning Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Learn more about you by linking your data with additional data through third-party data providers and/or analyzing the data with the help of analytics service providers (Account Data; Data About Your Accounts on Other Services; Usage Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Identify unique users across devices (Account Data; System Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Tailor advertisements across devices (Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Improve our Services and develop new products, services, and features (all data categories);
                            </li>
                            <li className={styles.policy_li}>
                                Analyze trends and traffic, track purchases, and track usage data (Account Data; Learning Data; Student Payment Data; Communications and Support; System Data; Usage Data; Approximate Geographic Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                Advertise the Services on third-party websites and applications (Account Data; Cookie Data);
                            </li>
                            <li className={styles.policy_li}>
                                As required or permitted by law (all data categories); or
                            </li>
                            <li className={styles.policy_li}>
                                As we, in our sole discretion, otherwise determine to be necessary to ensure the safety or integrity of our users, employees, third parties, the public, or our Services (all data categories).
                            </li>
                        </ul>

                        <p className='p_line_height mt-3'>FLearn or our partners may offer promotional codes and gifts to students. Some codes can be redeemed for gifts or promotional offers applicable to your FLearn account, which can then be used to eligible purchase content on our platform, subject to our terms and conditions. clause that acccompanies that code. Other codes can be redeemed directly for specific content. You cannot use gift and promotional offers to make purchases in our mobile or TV apps.</p>

                        <h2 id='section4' className={`${styles.content} text-xl sm:text-2xl`}>4. Content and behavior rules</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                We share certain data about you with instructors, other students, companies performing services for us, FLearn affiliates, our business partners, analytics and data enrichment providers, your social media providers, companies helping us run promotions and surveys, and advertising companies who help us promote our Services. We may also share your data as needed for security, legal compliance, or as part of a corporate restructuring. Lastly, we can share data in other ways if it is aggregated or de-identified or if we get your consent.</p>
                        </div>
                        <ul style={{ listStyleType: 'disc', paddingLeft: "1.8rem" }}>
                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Your Instructors:</u>
                                We share data that we have about you (except your email address) with instructors or teaching assistants for educational content you access or request information about, so they can improve their content for you and other students. This data may include things like your country, browser language, operating system, device settings, the site that brought you to FLearn, and certain activities on FLearn, like enrolled courses and course review. We will not share your email address with instructors or teaching assistants. (Account Data; System Data; Usage Data; Approximate Geographic Data)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Other Students and Instructors:</u>
                                Depending on your settings, your shared content and profile data may be publicly viewable, including to other students and instructors. If you ask a question to an instructor or teaching assistant, your information (including your name) may also be publicly viewable. (Account Data; Profile Data; Shared Content)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Other Students and Instructors:</u>
                                Depending on your settings, your shared content and profile data may be publicly viewable, including to other students and instructors. If you ask a question to an instructor or teaching assistant, your information (including your name) may also be publicly viewable. (Account Data; Profile Data; Shared Content)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Credit-Granting Organizations for Continuing Education:</u>
                                If you take a course to fulfill a continuing professional education requirement, we may share that information upon request of the organization granting the continuing education credit. (Account Data; Learning Data)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Analytics and Data Enrichment Services:</u> As part of our use of third-party analytics tools like Google Analytics and data enrichment services like ZoomInfo, we share certain contact information or de-identified data. De-identified data means data where we’ve removed things like your name and email address and replaced it with a token ID. This allows these providers to provide analytics services or match your data with publicly-available database information (including contact and social information from other sources). We do this to communicate with you in a more effective and customized manner. (Account Data; System Data; Usage Data; Cookie Data)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>During a Change in Control:</u>
                                If FLearn undergoes a business transaction like a merger, acquisition, corporate divestiture, or dissolution (including bankruptcy), or a sale of all or some of its assets, we may share, disclose, or transfer all of your data to the successor organization during such transition or in contemplation of a transition (including during due diligence). (All data categories)
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>After Aggregation/De-identification:</u>
                                We may disclose or use aggregated or de-identified data for any purpose.
                            </li>

                            <li className={styles.policy_li}>
                                <u className={styles.policy_u}>With Your Permission:</u>
                                With your consent, we may share data to third parties outside the scope of this Privacy Policy. (All data categories)
                            </li>
                        </ul>

                        <h2 id='section5' className={`${styles.content} text-xl sm:text-2xl`}>5. FLearn's rights to the content you post</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                We use appropriate security based on the type and sensitivity of data being stored. As with any internet-enabled system, there is always a risk of unauthorized access, so it’s important to protect your password and to contact us if you suspect any unauthorized access to your account.</p>
                        </div>

                        <p className='p_line_height mt-3'>
                            FLearn takes appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data that we collect and store. These measures vary based on the type and sensitivity of the data. Unfortunately, however, no system can be 100% secured, so we cannot guarantee that communications between you and FLearn, the Services, or any information provided to us in connection with the data we collect through the Services will be free from unauthorized access by third parties. Your password is an important part of our security system, and it is your responsibility to protect it. You should not share your password with any third party, and if you believe your password or account has been compromised, you should change it immediately and contact our
                            <a href="/support">Support Team</a>
                            with any concerns.
                        </p>

                        <h2 id='section6' className={`${styles.content} text-xl sm:text-2xl`}>6. Your Rights</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                You have certain rights around the use of your data, including the ability to opt out of promotional emails, cookies, and collection of your data by certain third parties. You can update or terminate your account from within our Services, and can also contact us for individual rights requests about your personal data. Parents who believe we’ve unintentionally collected personal data about their underage child should contact us for help deleting that information.
                            </p>
                        </div>

                        <p className='p_line_height mt-3'>
                            We recognize the privacy interests of children and encourage parents and guardians to take an active role in their children’s online activities and interests. Individuals younger than 18 years of age, but of the required age for consent to use online services where they live (for example, 13 in the US or 16 in Ireland), may not set up an account, but may have a parent or guardian open an account and help them access appropriate content. Individuals younger than the required age for consent to use online services may not use the Services. If we learn that we’ve collected personal data from a child under those ages, we will take reasonable steps to delete it.</p>

                        <p className='p_line_height mt-3'>

                            Parents who believe that FLearn may have collected personal data from a child under those ages can submit a request that it be removed to
                            <a className={styles.link_to} href="mailto:flearn@gmail.com"> privacy@flearn.com</a>
                        </p>

                        <h2 id='section7' className={`${styles.content} text-xl sm:text-2xl`}>7. Jurisdiction-Specifies Rules</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>
                                If you live in Vietnam, you have certain rights related to accessing and deleting your data, as well as learning who we share your data with. If you live in Australia, you have the right to make a formal complaint with the appropriate government agency. Users outside of the United States should note that we transfer data to the US and other areas outside of the European Economic Area.</p>
                        </div>

                        <p className='p_line_height mt-3'>
                            To exercise any of these rights under CCPA, please email
                            <a className={styles.link_to} href="mailto:flearn@gmail.com"> privacy@flearn.com </a>
                            or write to us at FLearn, Attn: Privacy/Legal Team, 600 Harrison Street, 3rd floor, San Francisco CA 94107. CCPA allows you to designate an authorized agent to make these requests on your behalf. For your protection, we may require that the request be sent through the email address associated with your account, and we may need to verify you and/or your agent’s identity before fulfilling your request.
                        </p>

                        <p className='p_line_height mt-3'>
                            To learn about the business and commercial purposes for which your personal information is collected and the categories of service providers who have access to your personal information, please see the sections above entitled “What We Use Your Data For” and “Who We Share Your Data With.”</p>

                        <h2 id='section8' className={`${styles.content} text-xl sm:text-2xl`}>8. Updates & Contact Info</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>When we make a material change to this policy, we’ll notify users via email, in-product notice, or another mechanism required by law. Changes become effective the day they’re posted. Please contact us via email or postal mail with any questions, concerns, or disputes.</p>
                        </div>
                        <p className='p_line_height mt-3'>From time to time, we may update this Privacy Policy. If we make any material change to it, we will notify you via email, through a notification posted on the Services, or as required by applicable law. We will also include a summary of the key changes. Unless stated otherwise, modifications will become effective on the day they are posted.</p>

                        <p className='p_line_height mt-3'>
                            Any capitalized terms not defined in this policy are defined as specified in FLearn's .
                            <a href="/terms">Terms of Use</a>
                            . Any version of this Privacy Policy in a language other than English is provided for convenience. If there is any conflict with a non-English version, you agree that the English language version will control.
                        </p>

                        <p className='p_line_height mt-3 mb-10'>
                            If you have any questions, concerns, or disputes regarding our Privacy Policy, please feel free to contact our privacy team (including our Data Protection Officer) at
                            <a href="mailto:flearn@gmail.com" className={styles.link_to}> flearn@.com</a>
                        </p>
                    </div>
                </div>
                <ScrollToTopButton />
            </div>
        </TermsLayout>

    )
}

export default Policy