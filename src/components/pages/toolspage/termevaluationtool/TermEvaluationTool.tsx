import EnvironmentService from "services/EnvironmentService";
import { useState } from "react";
import axios from "axios";

export default function TermEvaluationTool ({root_class = 'default', styles}): JSX.Element {
  const [selected_toggles, setSelectedToggles] = useState({
    gpt_4o_1 : {
      model_id : 'gpt_4o_1', 
      toggle_label : 'GTP-4o (1)',
      is_toggled: true
    },
    sonar_1 : {
      model_id : 'sonar_1', 
      toggle_label : 'Perplexity Sonar (1)',
      is_toggled: false
    },
    deepseek : {
      model_id : 'deepseek', 
      toggle_label : 'Deepseek',
      is_toggled: false
    },
    gpt_4o_2 : {
      model_id : 'gpt_4o_2', 
      toggle_label : 'GTP-4o (2)',
      is_toggled: false
    },
    sonar_2 : {
      model_id : 'sonar_2', 
      toggle_label : 'Perplexity Sonar (2)',
      is_toggled: false
    },
  });

  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [results, setResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handle_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResults(['...']);
    try {
      const models_parameter = [];
      Object.keys(selected_toggles).forEach(function (key) {
        if ((selected_toggles[key].is_toggled ?? false) === true) {
          models_parameter.push(selected_toggles[key].model_id);
        }
        return ;
      });

      const response = await axios.post(EnvironmentService.getUrlBase() + '/api/1/evaluate-term-query', {
          term: term,
          definition: definition,
          selected_models: models_parameter
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      const data = response.data;

      if (typeof (data[0].query_id ?? null) !== 'string') {
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

  const handleToggleClick = function (event: any) {
    const new_state = JSON.parse(JSON.stringify(selected_toggles));
    new_state[event.currentTarget.getAttribute('data-index')].is_toggled = !new_state[event.currentTarget.getAttribute('data-index')].is_toggled;
    setSelectedToggles(new_state);
  };

  const handleSelectAllClick = function (event: any) {
    const new_state = JSON.parse(JSON.stringify(selected_toggles));
    Object.keys(new_state).map(function (key) {
      new_state[key].is_toggled = true;
    });
    setSelectedToggles(new_state);
  };

  const toggles = Object.keys(selected_toggles).map(function (key) {
    const item_classes = [
      styles['jg-toggle-group-item']
    ];
    if (selected_toggles[key].is_toggled === true) {
      item_classes.push(styles['jg-toggle-group-item-is-toggled'])
    }

    return (
      <div key={key} className={item_classes.join(' ')} data-index={key} onClick={handleToggleClick}>
        {selected_toggles[key].toggle_label}
      </div>
    );
  });
  toggles.push(
    <div key={-1} className={`${styles['jg-full-width']} ${styles['jg-mt-5px']}`}>
      <div className={`${styles['jg-toggle-group-item']} ${styles['jg-toggle-group-item-secondary']}`}
        onClick={handleSelectAllClick}>
        Select all
      </div>
    </div>
  )

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
          className={`${styles['jg-textarea']} ${styles['jg-width-66-collapse']} ${styles['jg-mb-1rem']}`}
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Example - An individual or collaborative enterprise that is carefully planned to achieve a particular aim."
        ></textarea>

        <div className={`${styles['jg-padding-8-collapse']} ${styles['jg-width-66-collapse']}`}>
          <h2 className={`${styles['jg-overflow-hidden']} ${styles['js-asterix-decorate']}`}>Models</h2>
        </div>

        <div className={` ${styles['jg-toggle-group-container']}
          ${styles['jg-mb-1rem']} ${styles['jg-width-66-collapse']}`}>
          {toggles}
        </div>

        <button type="submit" className={styles['jg-submit-button']} disabled={isSubmitting}>
          {isSubmitting ? '...' : 'Submit'}
        </button>
        <div className={styles['jg-mt-2rem']}></div>

        <div className={styles['jg-padding-8-collapse']}>
          <h2 className={styles['jg-overflow-hidden']}>Results</h2>
        </div>

        <div className={`${styles['jg-response-data']} ${styles['jg-response-data-fixed-height']}`}>
          {results.map(function (item, index) {
            return (<div key={index}>{item}</div>);
          })}
        </div>
      </form>
    </>
  );
};