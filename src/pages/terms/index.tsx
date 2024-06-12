import { terms } from '../../consts'
import styles from './terms.module.css'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import TermsLayout from '../../layout/terms/TermsLayout'
const Terms: React.FC = () => {

    return (
        <TermsLayout>
            <div className='md:px-0 md:mx-10 px-6 relative'>
                <div className='w-full'>
                    <h1 className={`${styles.title} text-2xl md:text-4xl`}>Terms of Use</h1>
                    <p className='p_line_height mt-3'>
                        <i>These Terms of Use (<strong>"Term"</strong>) were last updated on June 6 , 2024.</i>
                    </p>
                    <p className='p_line_height mt-3'>
                        <strong>Please review these Terms carefully as they serve as an enforceable contract between us and contain important information about your rights, remedies and liabilities.</strong>
                    </p>
                    <p className='p_line_height mt-3'>
                        <strong>IF YOU LIVE IN THE VIETNAM OR US, BY AGREEING TO THESE TERMS, YOU AGREE TO RESOLVE ALL DISPUTES WITH FLearn IN SMALL CLAIMS COURT OR ONLY THROUGH BINDING INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN ANY CLASS ACTION AND WAIVE YOUR RIGHT TO A JURY DECISION, AS EXPLAINED IN THE DISPUTE RESOLUTION SECTION.</strong>
                    </p>
                    <div className='mt-3'>
                        <p className='p_line_height'>FLearn's mission is to improve lives through learning. We make it possible for anyone, anywhere, to create and share educational content (trainers) and access that educational content to learn (students). We consider this marketplace model to be the best way to deliver valuable educational content to users. We need rules to ensure our platform and services are safe for you, us, and our community of students and instructors. These Terms apply to all of your activities on the FLearn website, the FLearn mobile app, the TV app, our APIs, and other related services (
                            <strong>"Service"</strong>
                            )
                        </p>
                        <p className='p_line_height mt-4'>If you post a course on the FLearn platform, you must also agree to Terms for Instructors. We also provide details about our processing of personal data of students and lecturers in Privacy policy of us</p>
                        <p className='p_line_height mt-4'>Our website and applications cause communications about your web and application browsing activities and application usage to be sent from you to third parties that provide services to FLearn. By using our Services, you agree to these communications.</p>
                        <h2 className={`${styles.categories} text-xl sm:text-2xl mb-5`}>Categories</h2>
                        <ul className={styles.text_without_underline}>
                            {terms.map(term => (
                                <li className={`${styles.list_categories} md:text-xl text-sm`} key={term.id}>
                                    <a className={styles.category_color} href={term.link}>{term.name}</a>
                                </li>
                            ))}
                        </ul>


                        <h2 id='section1' className={`${styles.categories} text-xl sm:text-2xl`}>1. Account</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>You need an account for most activities on our platform. Please be sure to keep your password in a safe place, as you are responsible for all activities related to your account. If you suspect someone is using your account, please let us know by contacting Support Group ours. You must be of legal age to consent to online services in your country to use FLearn.</p>
                        </div>

                        <p className='p_line_height mt-3'>You need an account for most activities on our platform, including purchasing and accessing content or submitting content for posting. When establishing and maintaining an account, you must provide and continue to provide accurate and complete information, including a valid email address. You are solely responsible for your account and all activities that occur on your account, including any harm or damage (to us or anyone else) caused by someone else using your account. you without your permission. This means you need to keep your password carefully. You may not transfer your account to another person or use another person's account. If you contact us to request access to an account, we will not grant you access unless you can provide the information we need to prove you are the owner of the account. that account. In the event of a user's death, that user's account will be closed.</p>

                        <p className='p_line_height mt-3'>You may not share your account login information with anyone else. You are responsible for all activity on your account, and FLearn will not intervene in disputes between students or instructors sharing account login information. You must notify us immediately upon learning that someone may be using your account without your permission.</p>

                        <p className='p_line_height mt-3'>Students and instructors must be 18 years of age to create an account on FLearn and use the Services. If you are under 18 but over the age required to consent to use online services where you live (for example, 13 in the US or 16 in Ireland), you cannot set up an account but We encourage you to ask a parent or guardian to open an account and help you access appropriate content. If you are not old enough to consent to the use of these online services, you may not create a FLearn account. If we discover that you have created an account in violation of these rules, we will terminate your account.</p>


                        <h2 id='section2' className={`${styles.categories} text-xl sm:text-2xl`}>2. Content Subscription and Lifetime Access</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>When you enroll in a course or other content, you receive a license from us to view that content through the FLearn Services and not use it for any other purpose. Please do not attempt to transfer or resell the content in any way. We generally grant you a lifetime access license, unless we have to disable content for legal or policy reasons or for Subscription subscriptions.</p>
                        </div>
                        <p className='p_line_height mt-3'>Under our Instructor Terms, when instructors post content on FLearn, they grant FLearn a license to license the content to students, which means we have the right to sublicense the content to students. registered member. As a student, when you enroll in a course or other content, whether free or paid, you receive a license from FLearn to view the content through the platform and Services. of FLearn and FLearn is the licensor. Content is licensed and not sold to you. This license does not grant you any rights to resell the content in any way (including by sharing account information with the purchaser or illegally downloading the content and sharing it on other platforms). torrent site.</p>

                        <p className='p_line_height mt-3'>In fuller legal terms, FLearn grants you (as a student) a limited, non-exclusive, non-transferable license to access and view the content for which you have paid all fees. required fees, solely for personal, non-commercial educational purposes through the Services, subject to these Terms and any conditions or restrictions regarding specific content or features of the Services ours. All other uses are expressly prohibited. You may not copy, redistribute, transmit, transfer, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works, sublicense, transfer or use any content unless we expressly permit it in a written agreement signed by an authorized FLearn representative. This also applies to content you can access through any of our APIs.</p>

                        <p className='p_line_height mt-3'>Typically, we grant a student a lifetime access license when the student enrolls in a course or other content. However, we reserve the right to revoke any license to access and use any content at any time in the event that we decide or are obliged to disable access to the content for any reason. legal or policy reasons, for example, if a course or other content in which you are enrolled is the subject of a copyright infringement claim or if we determine that the content is infringing</p>

                        <p className='p_line_height mt-3'>
                            Instructors may not directly grant access to their content to students, and any such direct license is void and violates these Terms.</p>

                        <h2 id='section3' className={`${styles.categories} text-xl sm:text-2xl`}>3. Payments, Offers and Refunds</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>When paying, you agree to use a valid payment method. If you're not satisfied with the content, FLearn offers a 30-day refund or offer on most content purchases.</p>
                        </div>
                        <p className='p_line_height mt-3'>We will occasionally run promotions and sales for our content, where certain content will be made available at a discounted price for a certain period of time. The price applicable to that content will be the price at the time you complete your purchase of the content (at checkout). Any recommended prices for specific content may differ between the time you log in to your account and the price for unregistered or unlogged in users, due to some of our promotions. I'm just for new users.</p>

                        <p className='p_line_height mt-3'>You agree to pay for the content you purchase and you authorize us to charge your debit or credit card or process such charges by other payment methods (such as Boleto, SEPA, direct debit or mobile wallet). FLearn partners with payment service providers to offer you the most convenient payment methods in your country and to keep your payment information secure. We may update your payment method using information provided by our payment service provider.</p>

                        <p className='p_line_height mt-3'>If the content you purchased is not what you expected, within 30 days of purchasing the content, you can request a refund from FLearn to your account. This refund option does not apply to Subscription purchases, which are covered in Section 8.4 (Payment and Billing) below. We may, at our sole discretion, issue you a refund as a refund offer or a refund to your original payment method, subject to the capabilities of our payment service providers, the platform you purchased the content on (website, mobile app or TV) and other factors. You will not receive a refund if you submit a request after the 30-day guarantee period has expired. However, if content you previously purchased is disabled for legal or policy reasons, you are entitled to a refund after this 30-day limit. FLearn also reserves the right to refund students after the 30-day period in the event of suspected or confirmed account fraud.</p>

                        <p className='p_line_height mt-3'>FLearn or our partners may offer promotional codes and gifts to students. Some codes can be redeemed for gifts or promotional offers applicable to your FLearn account, which can then be used to eligible purchase content on our platform, subject to our terms and conditions. clause that acccompanies that code. Other codes can be redeemed directly for specific content. You cannot use gift and promotional offers to make purchases in our mobile or TV apps.</p>

                        <h2 id='section4' className={`${styles.categories} text-xl sm:text-2xl`}>4. Content and behavior rules</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>You may only use FLearn for lawful purposes. You are responsible for all content you post on our platform. You should ensure that the reviews, questions, posts, courses and other content you upload comply with our Trust & Safety Guidelines and the law, and respect intellectual property rights. wisdom of others. We may ban your account for repeated or serious violations. Please notify us if you believe someone is violating your copyright on our platform.</p>
                        </div>
                        <p className='p_line_height mt-3'>You may not access or use the Services or create an account for illegal purposes. Your use of the Services and your conduct on our platform is subject to applicable national or local laws or regulations in your country of residence. You are solely responsible for your knowledge of and compliance with the laws and regulations that apply to you.</p>

                        <p className='p_line_height mt-3'>If you are a student, the Services allow you to ask questions of instructors about courses or other content in which you are enrolled and to post reviews of the content. For certain content, instructors may invite you to submit content as “homework” or an exam. Don't post or send anything that isn't yours.</p>

                        <p className='p_line_height mt-3'>If you are an instructor, you can submit content to post on the platform, and you can also contact students enrolled in your course or other content. In both cases, you must comply with the law and respect the rights of others: you may not post any courses, questions, answers, reviews or other content that violates local laws or regulations. applicable local or national law in your country of residence. You are solely responsible for any courses, content and actions you post or take through the platform and Services and their consequences. Make sure you understand all applicable copyright restrictions</p>

                        <h2 id='section5' className={`${styles.categories} text-xl sm:text-2xl`}>5. FLearn's rights to the content you post</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>You maintain ownership of the content you post to our platform, including your courses. We are permitted to share your content with anyone else through any media, including promoting it through advertising on other websites.</p>
                        </div>

                        <p className='p_line_height mt-3'>When you post content, comments, questions, reviews, and when you send us ideas and suggestions for new features or improvements, you authorize FLearn to use and share this content with any anyone, distribute and promote such content on any platform and in any media and to modify or edit as it sees fit.</p>

                        <p className='p_line_height mt-3'>In legal terms, by submitting or posting content on or through the platforms, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, post, transmit, display and distribute your content (including your name and likeness) in any and all media or method of distribution (existing or later developed). This includes providing your content to other companies, organizations or individuals that partner with FLearn to syndicate, broadcast, distribute or post the content in other media, as well as using the content your content for marketing purposes. You also waive any rights of privacy, publicity or other rights of a similar nature applicable to all such uses, to the extent permitted under applicable law. You represent and warrant that you have all necessary rights, power and authority to authorize us to use any content you submit. You also agree to the use of your content as mentioned above without any compensation to you.</p>

                        <h2 id='section6' className={`${styles.categories} text-xl sm:text-2xl`}>6. Use FLearn at your own risk</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>Anyone can use FLearn to create and post content as well as instructors and we enable instructors and students to interact to teach and learn. Like other platforms where people can post content and interact, mistakes can happen and you use FLearn at your own risk.</p>
                        </div>

                        <p className='p_line_height mt-3'>The platform model means that we do not review or edit content for legal issues, and we do not have the authority to determine the legality of content. We do not exercise editorial control over the content available on the platform and therefore do not guarantee in any way the reliability, validity, accuracy or integrity of the content. If you access the content, you rely on any information provided by the instructor at your own risk.</p>

                        <p className='p_line_height mt-3'>By using the Services, you may be exposed to content that you consider offensive, indecent or objectionable. FLearn has no responsibility to separate such content from you and is not liable for your access to or enrollment in any courses or other content, to the extent permitted under applicable law. This also applies to any content related to health, fitness, and fitness. You acknowledge the risks and dangers inherent in the nature of this type of content and by accessing such content, you choose to voluntarily accept those risks, including the risk of illness, physical injury body, disability or death. You are solely responsible for the choices you make before, during and after accessing the content.</p>

                        <p className='p_line_height mt-3'>When you interact directly with a student or instructor, you must exercise caution when sharing these types of personal information. Although we limit the types of information that instructors can request from students, we do not control the actions that students and instructors take with the information they collect from others. other users on the platform. For your own safety, you should not share your email or other personal information about yourself.</p>

                        <p className='p_line_height mt-3'>We do not hire or employ instructors, and are not responsible or liable for any interactions between instructors and students. We are not responsible for disputes, claims, losses, injuries or damages of any kind that may arise from or in connection with the conduct of instructors or students.</p>

                        <p className='p_line_height mt-3'>When you use our Services, you will find links to other websites that we do not own or control. We are not responsible for the content or any other aspect of these third party websites, including their collection of information about you. You should also read their terms and conditions, as well as their privacy policy.</p>

                        <h2 id='section7' className={`${styles.categories} text-xl sm:text-2xl`}>7. FLearn Permissions</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>We own the FLearn platform and Services, including the website, current or future applications and services, and things like logos, APIs, code, and content created by our employees. You may not tamper with them or use them without permission.</p>
                        </div>

                        <p className='p_line_height mt-3'>All rights, title and interest in and to the FLearn platform and Services, including current or future websites, applications, APIs, databases and content that its employees or Our partners submit or make available through our Services (but excluding content provided by instructors and students) are and will remain the exclusive property of FLearn and its licensors. FLearn. Our platforms and services are protected by copyright, trademark, and other laws of both the United States and foreign countries. There are no rights granted to you to use the FLearn name or any FLearn trademarks, logos, domain names, and other distinctive brand features. Any feedback, comments or suggestions you may provide regarding FLearn or the Services are entirely voluntary and we will be free to use such feedback, comments or suggestions as we see fit and without have any obligations to you.</p>

                        <h2 id='section8' className={`${styles.categories} text-xl sm:text-2xl`}>8. Subscription package terms</h2>
                        <p className='p_line_height mt-3'>As part of your subscription to a Subscription, you will receive a limited, non-exclusive, non-transferable license from us to access and view the content contained in that Subscription through the Services. Except for the granting of lifetime access licenses, the terms contained in the “Content Enrollment and Lifetime Access” section above will apply to students enrolled through a Subscription Plan.</p>

                        <p className='p_line_height mt-3'>We reserve the right to revoke any license to use content in our Subscription Plans for legal or policy reasons at any time and in our sole discretion, for example if we no longer has the right to provide content through the Subscription Plan. Additional information about our revocation rights is provided in the “Content Enrollment and Lifetime Access” section.</p>

                        <p className='p_line_height mt-3'>You can start your subscription with a free trial. The free trial period for your subscription will be indicated during the registration process. FLearn determines free trial eligibility at our sole discretion and may limit access, eligibility, or free trial length. We reserve the right to terminate your free trial period and suspend your subscription if we determine that you are not eligible.</p>

                        <p className='p_line_height mt-3'>You must provide a payment method to subscribe to a Subscription Plan. By subscribing to a Subscription Plan and providing your payment information at checkout, you grant us and our payment providers permission to process payment for then applicable fees. via the payment method we keep on file for you. At the end of each subscription billing period, we will automatically renew your subscription for the same term and process your payment method for payment of then-applicable fees.</p>

                        <p className='p_line_height mt-3'>If we are unable to process payment through the payment method we have on file for you, or if you submit a dispute regarding charges charged to your payment method and chargebacks granted, we may suspend or terminate your subscription.</p>

                        <p className='p_line_height mt-3'>We reserve the right to change Subscription Plans or adjust prices for our Services at our sole discretion. Any changes in price or to your subscription plan will be effective upon our notice to you, unless otherwise required by applicable law.</p>

                        <h2 id='section9' className={`${styles.categories} text-xl sm:text-2xl`}>9. Other legal terms</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>These Terms are like any other contract, containing boring but important legal terms that protect us from a myriad of things that could happen and clarify the legal relationship between us and you.</p>
                        </div>

                        <p className='p_line_height mt-3'>You agree that by registering for, accessing, or using our Services, you are entering into a legally binding contract with FLearn. If you do not agree to these Terms, please do not register for, access or use any of our Services.</p>

                        <p className='p_line_height mt-3'>If you are an instructor accepting these Terms and using our Services on behalf of a company, organization, government or other legal entity, you represent and warrant that you are authorized to do so. the above actions.</p>

                        <p className='p_line_height mt-3'>If you behave in a way that puts us in legal trouble, we may take legal action against you. You agree to indemnify, defend (if required by us) and hold harmless FLearn, our group companies and their officers, directors, suppliers, partners and agents us against any third party claim, demand, loss, damage or expense (including reasonable attorneys' fees) arising out of: (a) content you post or submit; (b) your use of the Services; (c) your violation of these Terms or (d) your violation of any third party rights. Your indemnification obligation will survive termination of these Terms and your use of the Services.</p>

                        <h2 id='section10' className={`${styles.categories} text-xl sm:text-2xl`}>10. Dispute resolution</h2>
                        <div className={styles.alertBanner}>
                            <p className='p_line_height'>If there is a dispute, our Support Team is always happy to help resolve the issue. If this doesn't work and you live in the United States or Canada, you may choose to sue in small claims court or file a claim in binding individual arbitration; You may not sue in another court or participate in a class, non-individual action against us.</p>
                        </div>

                        <p className='p_line_height mt-3'>FLearn commits to making every effort to resolve disputes with FLearn users without filing a formal legal complaint. If a problem arises between the two parties, you and FLearn agree to first work diligently and in good faith to reach a solution that is fair and equitable to both parties using the dispute resolution process Not officially required are described below. Sometimes, a third party may be necessary to help resolve a dispute between two parties. This dispute resolution agreement limits how these disputes will be resolved.</p>

                        <p className='p_line_height mt-3'>
                            <strong>YOU AND FLEARN AGREE THAT ANY AND ALL DISPUTES, CLAIMS OR CONTROVERSIES ARISING OUT OF OR RELATING TO THESE TERMS OR THEIR APPLICABILITY, BREACH, TERMINATION, VALIDITY, ENFORCEMENT OR DISSOLUTION LIKE THEM OR THE USE OF THE SERVICES OR COMMUNICATIONS WITH FLEARN (COLLECTIVELY, “DISPUTES”) THAT ARE NOT INFORMALLY RESOLVED MUST BE RESOLVED EXCLUSIVELY IN A SMALL CLAIMS COURT OR THROUGH BINDING INDIVIDUAL ARBITRATION AND AGREE TO WAIVE THE RIGHT TO A JURY TRIAL AND TO FILE A CLAIM IN ANY OTHER COURT.</strong>
                        </p>

                        <p className='p_line_height mt-3'>You and FLearn agree that this Dispute Resolution Agreement applies to each party as well as all of their respective agents, attorneys, contractors, subcontractors, service providers, employees, and all others representing or on behalf of you and FLearn. This dispute resolution agreement is binding on your and FLearn's respective heirs, successors, and assigns, and is governed by the Federal Arbitration Act.</p>
                        <p className='p_line_height mt-3'>Disputes that arise but are not resolved through the mandatory informal dispute resolution process may be brought in small claims court located in: (a) San Francisco, California; (b) the county in which you live; or (c) another place mutually agreed upon by both parties. Each party hereby waives the right to bring any Dispute between them in courts other than small claims courts, including courts of general or special jurisdiction.</p>

                        <p className='p_line_height mt-3'>As the only alternative to small claims court, you and FLearn have the right to resolve Disputes through individual arbitration. Although there is no judge or jury in arbitration, the arbitrator has the same authority to award individual relief and must follow the agreement of the parties in the same way as a court would. . If either party brings the Dispute to a court other than a small claims court, the other party may ask the court to order the parties to arbitration. Either party may also ask the court to stay the court proceedings while the arbitration proceedings are ongoing. In the event any cause of action or claim cannot be resolved in arbitration, you and FLearn agree that all court proceedings will be pending resolution in arbitration. of all causes of action and claims. Nothing in this Dispute Resolution Agreement is intended to limit individual relief available to either party in arbitration or small claims court.</p>

                        <h2 id='section11' className={`${styles.categories} text-xl sm:text-2xl`}>11. Update these terms</h2>
                        <p className='p_line_height mt-3'>From time to time, we may update these Terms to clarify our practices or to reflect new or different practices (such as when adding new features), and FLearn has full discretion. the right, in our sole discretion, to modify and/or make changes to these Terms at any time. If we make significant changes, we will notify you by preferred means, such as email notification sent to the email address specified in your account or by posting a notice via Our services. Modifications will be effective on the date of posting unless otherwise stated.</p>
                        <p className='p_line_height mt-3'>Your continued use of our Services after changes take effect means you accept those changes. Any revised Terms will supersede all prior Terms.</p>

                        <h2 id='section12' className={`${styles.categories} text-xl sm:text-2xl`}>12. How to contact us</h2>
                        <p className='p_line_height mt-3'>The best way to contact us is to contact our support team</p>
                        <p className='p_line_height mt-1 mb-8'>Thank you for teaching and learning with us!</p>
                    </div>
                </div>
                <ScrollToTopButton />
            </div>
        </TermsLayout>

    )
}

export default Terms