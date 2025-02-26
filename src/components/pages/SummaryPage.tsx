import MainNavigation from "components/MainNavigation";

export default function SummaryPage (): JSX.Element {
  return (
    <>
        <MainNavigation/>
        <div className="front-page">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <section className="first-section">
                        <h2>Hello.</h2>
                        <p>Here is a quick summary of my work history and skills. No ChatGPT or LLMs involved.</p>
                        <p>
                        I have 7+ years of professional experience in web/software development, mostly with PHP/LAMP based tech stacks. <br/>
                        The work I've done has leaned towards backend/server development, but ultimately, I'm comfortable with building and maintaining systems end-to-end. This includes frontend development and managing infraucture.
                        </p>

                        <h3>Work history:</h3>
                        <ul>
                            <li>Allied Technical Solutions Inc. - 2 years</li>
                            <li>Aware Ads Inc. - 3 years</li>
                            <li>Rent  Panda Inc. - 6 months</li>
                            <li>Contract work for various smaller businesses in Toronto - 2+ years</li>
                        </ul>
                        <p>
                        I would be happy to hear about your next web related project, even if you're just looking to solicit an opinion. <br/> 
                        Email me at j@guevarajust.in.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
};