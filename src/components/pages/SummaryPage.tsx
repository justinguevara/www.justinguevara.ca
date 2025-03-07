import MainNavigation from "components/MainNavigation";

export default function SummaryPage (): JSX.Element {
  return (
    <>
        <MainNavigation/>
        <div className="front-page default">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <section className="first-section">
                        <h2>Summary of skills and experience</h2>
                        <h3>Overview</h3>
                        <p>
                        I have 7+ years of professional experience in web/software development, mostly with PHP/LAMP based tech stacks. <br/>
                        The work I've done has leaned towards backend/server development, but ultimately, I build and maintain systems end-to-end. This includes frontend development and managing infrastructure.
                        </p>

                        <h3>History</h3>
                        <ul className="compact-list">
                            <li>Allied Technical Solutions Inc.</li>
                                <ul>
                                    <li>2 years</li>
                                </ul>
                            <li>Aware Ads Inc.</li>
                                <ul>
                                    <li>3 years</li>
                                </ul>
                            <li>Rent Panda Inc.</li>
                                <ul>
                                    <li>6 months</li>
                                </ul>
                            <li>Contract work for various smaller businesses in Toronto
                                <ul>
                                    <li> 2+ years (over 9+ year time period)</li>
                                    <li>Non-exhaustive list of clients:</li>
                                    <ul>
                                        <li>Brickworks Ciderhouse</li>
                                        <li>DY Printing Box</li>
                                    </ul>
                                </ul>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
};