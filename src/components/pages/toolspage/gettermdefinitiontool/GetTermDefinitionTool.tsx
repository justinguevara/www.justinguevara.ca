import EnvironmentService from "services/EnvironmentService";
import { useState } from "react";
import axios from "axios";

export default function GetTermDefinitionTool ({root_class = 'default', styles}): JSX.Element {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResults(['...']);

    try {
      const response = await axios.post(EnvironmentService.getUrlBase() + '/api/1/definition-query', {
        term: term
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;

      const processed_elements = data.map(function (item, index) {
        return `${item.query_id ?? 'Unknown model'} - ${(item.response?.content?.definition ?? 'error')}`;
      });

      setResults(processed_elements);
    } catch (error) {
      setResults(['Error - request failed.']);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 4000);
    }
  };

  return (
    <>
      <h1 className={`${styles['jg-page-heading']} ${styles['jg-content-margin-top']}`}>Get Term Definitions</h1>
      <div className={`${styles['jg-padding-single-indent-collapse']} ${styles['jg-width-66-collapse']}`}>
      Get a definition for a provided term. 
      </div>
      
      <form onSubmit={handle_submit}>
        <div className={`${styles['jg-padding-8-collapse']} ${styles['jg-width-66-collapse']}`}>
          <h2 className={`${styles['jg-margin-top-50']} ${styles['jg-overflow-hidden']} ${styles['js-asterix-decorate']}`}>Term</h2>
        </div>
        <input
          type="text"
          className={`${styles['jg-input']} ${styles['jg-mb-1rem']} ${styles['jg-width-66-collapse']}`}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Example - Project"
        />

        <button type="submit" className={styles['jg-submit-button']} disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Submit'}
        </button>
        <div className={styles['jg-mt-2rem']}></div>

        <div className={styles['jg-padding-8-collapse']}>
          <h2 className={styles['jg-overflow-hidden']}>Results</h2>
        </div>

        <div className={`${styles['jg-response-data-flexible-height']} ${styles['jg-response-data']}`}>
          {results.map(function (item, index) {
            return (<div className={styles['jg-response-data-section']} key={index}>{item}</div>);
          })}
        </div>
      </form>
    </>
  );
};