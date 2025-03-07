import MainNavigation from "components/MainNavigation";

function About (): JSX.Element {
  return (
    <>
        <MainNavigation/>
        <div className="front-page default">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <h2>Hello.</h2>
                    <p>For nearly a decade, I've worked as a software developer for various companies throughout Toronto, both as a freelancer and as a in-house developer.</p>
                    <p>My career has involved a wide variety of tech projects, from WordPress brochure websites, to content websites supporting millions of users, to complex B2B SaaS systems.</p>
                    <h3 className="mt-8">www.justinguevara.ca - tech stack details.</h3>
                    <ul className="compact-list">
                        <li>Backend</li>
                        <ul>
                            <li>The site's backend is written in PHP and uses the PHP web framework Laravel.</li>
                            <li>A MariaDB instance hosted on AWS Lightsail is used for data persistence; Nginx is used to serve the app.</li>
                            <li>The app is containerized using docker containers running a Debian 12 environment.</li>
                            <li>These docker containers are run by AWS Lightsail instances.</li>
                        </ul>
                        <li className="mt-3">Frontend</li>
                        <ul>
                            <li>
                                The frontend app is written in TypeScript, and uses the frontend framework React, along with Vite.
                            </li>
                            <li>
                                For hosting, the compiled project is hosted on AWS Cloudfront in combination with AWS S3.
                            </li>
                        </ul>
                        <li className="mt-3">Misc.</li>
                        <ul>
                            <li>Domain names were purchased through Namecheap, but are managed through AWS Route 53. Namecheap's name servers have been configured to redirect to AWS.</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
};

export default About;