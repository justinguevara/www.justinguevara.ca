import MainNavigation from "components/MainNavigation";
import "./style.css";
import mocked_items from "./data.tsx";

export default function QuestionMarkPage (): JSX.Element {
  const filtered_items = [...mocked_items];
  // @todo
  const item_count = mocked_items.length;

  return (
    <>
      <MainNavigation/>
      <div>
        <div className="page-container">
          <div className="page-content">
            <div className="page-item-alpha">
              <div className="page-item-alpha-dropdowns">
                <div className="page-item-alpha-dropdowns-count">
                {item_count}
                </div>
                <select>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
                <select>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="page-item-alpha-items">
                {filtered_items.map(function (item, index) {
                  const background_link = (item.image ?? null) ? item.image : '/p1.png';
                  const rating = (item.rating ?? null) ? item.rating : '';
                  const short_form_views = (item.downloads ?? null) ? formatNumber(item.downloads ?? 0) : '';

                  return (
                    <div key={index} className="page-item-alpha-item" style={{backgroundImage: `url(${background_link})`}}>
                      <div className="page-item-alpha-item-upper-section">
                        <div className="page-item-alpha-item-upper-section-header">{rating} - {short_form_views}</div>
                        <div className="page-item-alpha-item-upper-section-footer">{item.status}</div>
                      </div>
                      <div className="page-item-alpha-item-lower-section">
                        <div className="page-item-alpha-item-heading">{item.name}</div>
                        <div className="page-item-alpha-item-subheading">{item.series}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function formatNumber(number: number): string {
  let output: string;
  if (number >= 1000000) {
    output = (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    output = (number / 1000).toFixed(1) + 'K';
  } else {
    output = number.toString();
  }
  return output;
}