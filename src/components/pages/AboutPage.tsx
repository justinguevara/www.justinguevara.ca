import MainNavigation from "components/MainNavigation";

function About (): JSX.Element {
  return (
    <>
        <MainNavigation/>
        <div className="front-page">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <section className="first-section">
                        <h4 style={{fontSize:'1.5em'}}>Hello.</h4>
                        <p>For nearly a decade, I've worked as a software developer for various companies throughout Toronto, both as a freelancer and as a full-time employee.</p>
                        <p>My career has involved a wide variety of tech projects, from WordPress brochure websites, to content websites supporting millions of users, to complex B2B SaaS systems.</p>
                        <p>Any questions? Please don't hesistate to contact me through email or on socials.</p>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
};

export default About;