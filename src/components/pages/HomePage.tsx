import MainNavigation from "components/MainNavigation";

function HomePage (): JSX.Element {
  return (
    <>
      <MainNavigation/>
      <div className="front-page">
          <div className="center-block-element content-width">
            <div className="primary-content-container">
                <section className="first-section">
                    <div className="name">Justin Guevara</div>
                    <ul className="secondary-font below-name">
                        <li className="email">j[at]guevarajust[dot]in</li>
                        <li><a href="https://linkedin.com/in/justinguevara" className="link">linkedin.com/in/justinguevara</a></li>
                    </ul>
                    <div className="secondary-font short-description"><span className="bold">Experienced Software Developer </span> based in <span className="bold"> Toronto, Canada</span>.</div>
                </section>
                <section className="quotes">
                    <div className="quote">
                        <div className="content">you were great, and I would highly recommend you to anyone in the industry</div>
                        <div className="person"><a href="https://torontolife.com/tag/chris-noll/" className="link">Chris Noll</a>, CEO of <a href="https://torontolife.com/food/mill-street-brewery-purchases-torontos-brickworks-ciderhouse">Brickworks Ciderhouse</a></div>
                    </div>
                    <div className="quote">
                        <div className="content">a wonderful developer</div>
                        <div className="person"><a href="https://www.linkedin.com/in/sunjoyotanto/" className="link">Sunjoyo Tanto</a>, Web Programmer & IT Analyst</div>
                    </div>
                </section>
            </div>
          </div>
      </div>
    </>
  );
};

export default HomePage;