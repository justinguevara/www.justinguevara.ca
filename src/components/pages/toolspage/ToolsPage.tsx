import MainNavigation from "components/MainNavigation";
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
      const response = await axios.post('https://localhost:443/api/1/query', {
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
        <h1 className="jg-page-heading">Term Definition Evaluation Tool</h1>
        <div className="jg-two-column-layout">
          <div className="jg-column jg-column-2-3">
            <form onSubmit={handle_submit}>
              <h2 className="jg-heading">Term</h2>
              <input
                type="text"
                className="jg-input jg-mb-1rem"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <h2 className="jg-heading">Definition</h2>
              <textarea
                className="jg-textarea jg-mb-1rem"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
              ></textarea>
              <button type="submit" className="jg-submit-button" disabled={isSubmitting}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <div className="jg-mt-1rem"></div>
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