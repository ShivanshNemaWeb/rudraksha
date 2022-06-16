import React from 'react'
import "./Faq.css"
import Navbar from '../Navbar/Navbar';
import HomeHeading from '../HomeHeading/HomeHeading';
import FooterPagePro from '../Footer/Footer';

function Faq() {
    return (
        <>
            <HomeHeading />
            <Navbar />
            <div className='BodyFaq'>
                <div className='HeaderFaq'>
                    <img src={require('../../Images/faq.jpg')} />


                </div>

                <div className='MainFaq container'>

                    <div className="panelMain panel-group" id="accordion">
                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_1">Q1. What is the Objective of floating this Foundation? </a></h4>
                            </div>



                            <div id="col_1" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Our Foundation, is a Section 8 Company, (Non-Profit Organization), registered under
                                        Ministry of Corporate Affairs, GOI, had been setup on 27th March 2019, with a prime core
                                        objective to serve our Nation on a larger perspective in the fields of Art, Culture, Religion,
                                        Education, Health, Climate Protection, Blood Donation, Old Age Homes, Orphanages Support,
                                        Sports Training, Professional Trainings, Acid Attack Victims Support, Animal Welfare, Defence
                                        Personals Families Support, Drugs De-addiction & Human Rights.</p>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_2">Q2. What would be the source of Funds?</a></h4>
                            </div>

                            <div id="col_2" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We cumulate funds from legitimate means only by offering various types high quality
                                        Digital services, Astrological, Vastu Shastra, Numerology, Tarot Cards, Lal Kitab services and
                                        FMCG products to society, be keeping a slight profit margin in order to fund the above
                                        mentioned Projects & respective maintenance costs attached.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_3">Q3. Do we take CSR Funds for these Projects?</a></h4>
                            </div>

                            <div id="col_3" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We will appreciate any respective Organization, State, Regulatory Bodies and Central
                                        Government, who would like to express their interest in our Projects; though our eligibility as
                                        per respected Ministry of Corporate Affairs, guidelines for a Section 8, will begin after 2 years
                                        of self-sustainability operations from FY 2022-23 onwards. Any other Donor / Organization /
                                        Regulatory Bodies / Government Authorities, in case interested will be highly appreciated and
                                        will be provided by detailed Reports of Expenditure, Purchases, Impact Assessment and
                                        Database access to the respective Project(s), in which the money received had been spent, to
                                        the limit of the concerned</p>
                                </div>
                            </div>
                        </div>



                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_4">Q4. Do we accept Donations?</a></h4>
                            </div>

                            <div id="col_4" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Yes; we are obliged in case anyone would like to donate us in this social cause, though we
                                        would like to request everyone to kindly buy our Economical and High Quality daily usage
                                        FMCG Products and Digital Services, as the Profit earned out of their Sales, will be used only
                                        for Philanthropic Activities and bearing maintenance costs attached. We work under strict
                                        compliance of Ministry of Corporate Affairs for a Section 8 unit and are under surveillance as
                                        per mandatory submissions supposed to be made at their respected official portals at regular
                                        intervals. </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_5">Q5. Do we accept cash Donations?</a></h4>
                            </div>

                            <div id="col_5" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We have a legitimate Current Account, with a Nationalised Bank, which has a cash deposit
                                        and withdrawal Freeze being placed with a motive to reduce misappropriation of funds and to
                                        avoid all illegal cash transactions. We accept donations only via legitimate means as approved
                                        by respected RBI, guidelines i.e. Fund Transfers, Checks, E-Wallets, UPI and Demand Drafts.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_6">Q6. How many offices/ Branches do we have?</a></h4>
                            </div>

                            <div id="col_6" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We have initiated operations with our H.O. in Chandigarh and will expedite operations in
                                        neighbouring States in upcoming time frame. The Head office Address is mentioned in the
                                        Footer of this website for your kind perusal.  </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_7">Q7. Do we have GST & FSSAI Licences to operate Business?</a></h4>
                            </div>

                            <div id="col_7" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Yes; we have them and details can be sought from our H.O. as per demand by all respected
                                        organizations or individuals. The GST Number is also mentioned in the Footer of this Website. </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_8">Q8. What is our Professional Hierarchy?</a></h4>
                            </div>

                            <div id="col_8" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Our Professional hierarchy comprises from top to bottom as Promoter, Managing Director,
                                        Cluster Manager, Branch Manager, Operations Manager, Team Lead, Relationship Manager,
                                        Sales Force and Support Staff. This hierarchy is expected to follow (from Cluster Manager &
                                        below) in all branches, based on positions availability.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_9">Q9. Do we have Volunteers?</a></h4>
                            </div>

                            <div id="col_9" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Yes; we appreciate a lot whosoever would like to join in this social cause, without any
                                        deviation of his/her personal Business motive to be very clear from the beginning.  </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_10">Q10. Can students join us for Internships?</a></h4>
                            </div>

                            <div id="col_10" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Yes; we do hire Interns on various profiles like Mobile Application Development, Website
                                        Development, Surveys, Content Writing, Digital Marketing, Adobe Designing, Mobile
                                        Application UI/UX Designers, Language Converters and Philanthropic Workers. These Interns
                                        will always get monthly pay-outs, supported by Appointment Letters on Joining & Certificates
                                        on completion and possibly Job offers within our Organization in due course. The Stipends will
                                        be paid into their respective Savings Account or UPI, E-Wallets only.  </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_11">Q11. What skills are we looking for in general? </a></h4>
                            </div>

                            <div id="col_11" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We appreciate UNSDG / Masters in Social Work Professionals, IT Professionals, Sales Force
                                        and Marketing Experts. The Graduates in any other stream can also apply.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_12">Q12. What do we offer to our Employees? </a></h4>
                            </div>

                            <div id="col_12" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We offer them a decent start-up salary, (as per NGO standards), IT Equipment’s, Life, Travel
                                        & Health Insurance (post 6 months’ probation) and opportunities for National & International
                                        Travel. The Travel Insurance will be based on International Travel on Project work. </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_13">Q13. What is the Promotion Criteria?</a></h4>
                            </div>

                            <div id="col_13" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: We have an Internal CRM system to monitor performance of our employees; every month,
                                        which is based on Professional Etiquettes, Sales Volumes, Attendance, Tenure, Network
                                        Enhancement and Behaviour. We will gauge the respective Employee on Quarterly/Half Yearly
                                        basis, though feedbacks will be offered on monthly basis. The initial promotion will be
                                        applicable after completion of 1 Year regular service with us at any branch or multiple
                                        branches, in case being transferred as per need of the Project(s). The rest detailed information
                                        is mentioned in our Code of Conduct, (Promotion Policy), as available in our website. </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_14">Q14. Do our Employees have mandate of having a wheeler?
                                </a></h4>
                            </div>

                            <div id="col_14" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: Yes; preferably.</p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_15">Q15. What are the different types of Leaves we offer to our Employees?
                                </a></h4>
                            </div>

                            <div id="col_15" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: You are requested to kindly check our Code of Conduct, (Leave Policy), as available in our
                                        website. </p>
                                </div>
                            </div>
                        </div>


                        <div className="panel panel-default">
                            <div className="brown panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#col_16"> Q16. Do we hire final year students or under graduates? </a></h4>
                            </div>

                            <div id="col_16" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <p>A: It depends upon approval of hire management and based on situations. The under
                                        graduates, can be adjusted only in Sales Forces, Administrative roles; if required.  </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <FooterPagePro />
        </>
    )
}

export default Faq
