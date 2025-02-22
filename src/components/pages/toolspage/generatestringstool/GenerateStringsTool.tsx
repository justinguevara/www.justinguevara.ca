
import { useState } from "react";

const default_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const default_string_count = 5;
const default_string_length = 32;

export default function generateStringsTool ({styles}): JSX.Element {
  const [string_count, setStringCount] = useState(default_string_count);
  const [string_length, setStringLength] = useState(default_string_length);
  const [strings, setStrings] = useState([]);
  const [character_set, setCharacterSet] = useState(default_characters);

  const handleSubmit = function () {
    setStrings((function (): [] {
      const output = [];
      for (let i = 0; i < string_count; i++) {
        let result = '';
        for (let j = 0; j < string_length; j++) {
          result += character_set.charAt(Math.floor(Math.random() * character_set.length));
        }
        output.push(result);
      }
      return output;
    })());
  };

  const handleCharacterSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacterSet(event.target.value);
  };

  const handleStringCountChange = function (event: React.ChangeEvent<HTMLSelectElement>) {
    let number = event.target.value;
    if (Number.isNaN(number) === false 
     && number > 256
    ) {
      number = 256;
    }
    setStringCount(number);
  };

  const handleStringLengthChange = function (event: React.ChangeEvent<HTMLSelectElement>) {
    let number = event.target.value;
    if (Number.isNaN(number) === false 
     && number > 122
    ) {
      number = 122;
    }

    setStringLength(number)
  };

  const handleReset = () => {
    setStrings([]);
  };  

  const content = strings.map(function (element, index) {
    return (<div key={index}>{element}</div>);
  });

  return (
    <div className={`${styles['jg-generate-strings-tool']}`}>
      <h1 className={`${styles['jg-page-heading']} ${styles['jg-content-margin-top']}`}>
        Generate strings</h1>
      <div className={`${styles['jg-padding-single-indent-collapse']} ${styles['jg-width-66-collapse']}`}>
        Generate strings formed with randomly selected characters.
      </div>
      <div className={`${styles['jg-margin-top-50']} ${styles['jg-padding-8-collapse']}`}>
        <div className={`${styles['jg-options']}`}>
          <div className={`${styles['jg-column']}`}>
            <div>
              Characters
              <input type="text"
                className={`${styles['jg-inline-input']}`}
                value={character_set}
                onChange={handleCharacterSetChange}
                size="30" />
            </div>
            
            <div>
              Length
              <input type="text" className={`${styles['jg-inline-input']}`}
                value={default_string_length}
                size="2"
                value={string_length}
                onChange={handleStringLengthChange} />
            </div>

            <div>
              String Count
              <input type="text"
                className={`${styles['jg-inline-input']}`}
                value={string_count}
                size="2"
                onChange={handleStringCountChange} />
              </div>
          </div>
          <div className={`${styles['jg-column']} ${styles['jg-right']}`}>
              <button onClick={handleSubmit} >Generate</button>
            <button onClick={handleReset} >Reset</button>
          </div>
        </div>
      </div>
      <div className={`${styles['jg-output']}`}>
        {content}
      </div>
    </div>
  );
};