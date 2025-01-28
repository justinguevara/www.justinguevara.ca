import MainNavigation from "components/MainNavigation";
import EnvironmentService from "services/EnvironmentService";
import { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

export default function ToolsPage (): JSX.Element {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [results, setResults] = useState(<div></div>);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResults(<div>...</div>);
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
      if (typeof (data[0]?.model ?? null) !== 'string') {
        // @todo
        throw 'error';
      }
      const processed_elements = data.map((item, index) => (
        <div key={index}>{(item.model ?? '').toLowerCase()} - {(item.content ?? '').toLowerCase()}</div>
      ));

      setResults(processed_elements);
    } catch (error) {
      setResults(<div>'error'</div>);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 4000);
    }
  };

  return (
    <>
      <MainNavigation />
      <div className="jg-page-container">
        <div className="jg-two-column-layout">
          <div className="jg-column jg-column-2-3">
            <div className="jg-mt-2rem"></div>
            <div className="jg-under-construction">In Development</div>
            <div className="jg-mt-2rem"></div>
            <h1 className="jg-page-heading">Term Definition Evaluation Tool</h1>
            <h1 className="jg-subheading">Submit a term, along with its definition. 
              The tool will invoke LLM models to evaluate the correctness of the definition, with a series of yes or no answers.</h1>

            <form onSubmit={handle_submit}>
              <h2 className="jg-heading">Term</h2>
              <input
                type="text"
                className="jg-input jg-mb-1rem"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Example - Project"
              />
              <h2 className="jg-heading">Definition</h2>
              <textarea
                className="jg-textarea jg-mb-1rem"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Example - An individual or collaborative enterprise that is carefully planned to achieve a particular aim."
              ></textarea>
              <button type="submit" className="jg-submit-button" disabled={isSubmitting}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <div className="jg-mt-2rem"></div>

              <h2 className="jg-heading">Results</h2>
              <div className="jg-response-data">
                {results}
              </div>
            </form>
          </div>
          <div className="jg-column jg-column-1-3">
          </div>
        </div>
      </div>
    </>
  );
};