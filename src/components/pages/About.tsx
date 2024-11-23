import MainNavigation from "components/MainNavigation";

function About (): JSX.Element {
  return (
    <>
        <MainNavigation/>
        <div className="front-page">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <section className="first-section">
                        <p>Hello.</p>
                        <p>For nearly a decade, I've worked as a software developer for various companies throughout Toronto, both as a freelancer and as a full-time employee.</p>
                        <p>My career has involved many types of projects, such as: WordPress brochure websites, content websites supporting millions of users and complex B2B SaaS systems.</p>
                        <p>So far, my technical focus has been Backend and Full-stack, with PHP/JavaScript ecosystems.</p>
                        <p>If you have any questions, please don't hesistate to contact me through email or on socials.</p>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
};

export default About;