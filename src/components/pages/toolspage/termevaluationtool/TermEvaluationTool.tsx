import EnvironmentService from "services/EnvironmentService";
import { useState } from "react";
import axios from "axios";

export default function TermEvaluationTool ({root_class = 'default', styles}): JSX.Element {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResults(['...']);
    try {
      const response = await axios.post(EnvironmentService.getUrlBase() + '/api/1/query', {
        term: term,
        definition: definition,
        query_type: 'evaluate'
      }, {
        headers: {
          'Content-Type': 'text/plain',
        }
      });
      const data = response.data;

      if (typeof (data[0].model ?? null) !== 'string') {
        // @todo
        throw 'error';
      }
      const processed_elements = data.map(function (item, index) {
        return `${item.model ?? 'Unknown model'} - ${(item.response?.content?.answer ?? 'error').toLowerCase()}`;
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
      <h1 className={`${styles['jg-page-heading']} ${styles['jg-content-margin-top']}`}>Term Definition Evaluation</h1>
      <div className={`${styles['jg-padding-single-indent-collapse']} ${styles['jg-width-66-collapse']}`}>
        Submit a term, along with its definition. 
        The tool will invoke LLM models to evaluate the correctness of the definition.
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
        <div className={`${styles['jg-padding-8-collapse']} ${styles['jg-width-66-collapse']}`}>
          <h2 className={`${styles['jg-overflow-hidden']} ${styles['js-asterix-decorate']}`}>Definition</h2>
        </div>
        <textarea
          className={`${styles['jg-textarea']} ${styles['jg-mb-1rem']} ${styles['jg-width-66-collapse']}`}
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Example - An individual or collaborative enterprise that is carefully planned to achieve a particular aim."
        ></textarea>
        <button type="submit" className={styles['jg-submit-button']} disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Submit'}
        </button>
        <div className={styles['jg-mt-2rem']}></div>

        <div className={styles['jg-padding-8-collapse']}>
          <h2 className={styles['jg-overflow-hidden']}>Results</h2>
        </div>
        <div className={styles['jg-response-data']}>
          {results.map(function (item, index) {
            return (<div key={index}>{item}</div>);
          })}
        </div>
      </form>
    </>
  );
};