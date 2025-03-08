import MainNavigation from "components/MainNavigation";
import { useRef, useEffect } from 'react';
import seedrandom from 'seedrandom';

export default function HomePage (): JSX.Element {
  const canvas_reference = useRef(null);
  useEffect(() => {
    const canvas = canvas_reference.current;
    const context = canvas.getContext('2d');
    var random = new seedrandom(seed);
    for (let y = 0; y < canvas_height; y++) {
      for (let x = 0; x < canvas_width; x++) {
        if (normalizeNumber(x, 0, canvas_width) < random()) {
          const random_color = 'rgb(' + color_palette[Math.floor( (random() * color_palette.length) )].join(', ') + ')';
          context.fillStyle = random_color;
          context.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
        }
      }
    }
  }, []);

  return (
    <>
      <MainNavigation />
      <div className="front-page">
        <div className="center-block-element content-width">
          <div className="canvas-container">
            <div className="canvas-inner-container">
              <canvas className="canvas" ref={canvas_reference} width={canvas_width} height={canvas_height} />
            </div>
          </div>

          <div className="primary-content-container">
            <section className="first-section">
              <div className="name">Justin Guevara</div>
              <ul className="secondary-font below-name">
                <li className="email">j[at]guevarajust[dot]in</li>
                <li><a href="https://linkedin.com/in/justinguevara" className="link">linkedin.com/in/justinguevara</a></li>
              </ul>
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

const canvas_height = 154;
const canvas_width = 1148;
const pixel_size = 22;
const seed = '5';

const normalizeNumber = function (value: number, min: number, max: number) {
  let scaled = (value - min) / (max - min);
  return 0.95 - scaled * (0.99 - 0.5);
};

const color_palette = [
  [34, 54, 98],
  [38, 120, 113],
  [231, 118, 47],
  [245, 192, 67],
  [221, 210, 190],
  [108, 81, 135],
  [51, 51, 51]
];