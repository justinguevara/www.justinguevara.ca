import { Link } from 'react-router-dom';
                
function NotFoundPage (): JSX.Element {
  return (
    <>
        <div className="front-page">
            <div className="center-block-element content-width">
                <div className="primary-content-container">
                    <section className="first-section">
                        <p>Page not found.</p>
                        <br/>
                        <p>Return <Link to="/"><u>home</u></Link></p>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
};

export default NotFoundPage;