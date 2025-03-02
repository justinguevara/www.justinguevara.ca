import MainNavigation from "components/MainNavigation";
import TermEvaluationTool from "./termevaluationtool/TermEvaluationTool";
import GenerateStringsTool from "./generatestringstool/GenerateStringsTool";
import GetTermDefinitionTool from "./gettermdefinitiontool/GetTermDefinitionTool";
import NotesTool from "./notestool/NotesTool";
import "./navigation.css"; // override  navigation styles
import styles from "./style.module.css";
import { useState } from "react";

export default function ToolsPage (): JSX.Element {
  const [selected_tool, setSelectedTool] = useState(tools_list.generate_strings.id);
  const [show_mobile_secondary_menu, setShowMobileSecondaryMenu] = useState(false);

  const show_mobile_menu_class = show_mobile_secondary_menu ? 'jg-show' : 'jg-hide';

  const handleSecondaryMenuIconClick = function () {
    setShowMobileSecondaryMenu(!show_mobile_secondary_menu);
  };

  const on_secondary_menu_item_click = function (event: React.MouseEvent<HTMLDivElement>) {
    setShowMobileSecondaryMenu(false);
    setSelectedTool(event.currentTarget.getAttribute('data-tool-id'));
  };

  const secondary_menu_html = Object.keys(tools_list).map(function (key) {
    return (
      <div
        key={tools_list[key].id}
        className={styles['jg-menu-item']}
        data-tool-id={tools_list[key].id}
        onClick={on_secondary_menu_item_click}>
        <span>{tools_list[key].label}</span>
      </div>
    );
  });

  let SelectedToolComponent = tools_list[selected_tool].component;

  return (
    <div id='jg-tools-page' className={`${styles['jg-page-wrapper']} ${styles['jg-tools-page']}`}>
      <div className={`${styles['jg-non-footer']}`}>
        <MainNavigation root_class="tools-page" />

        <div className={`${styles['jg-secondary-menu']} ${styles[show_mobile_menu_class]}`}>
          <div className={`${styles['jg-mobile-menu-icon']}`} onClick={handleSecondaryMenuIconClick}>Open tools menu</div>
          <div className={`${styles['jg-secondary-menu-item-container-anchor']}`}>
            <div className={`${styles['jg-secondary-menu-item-container']}`}>
              {secondary_menu_html}
            </div>
          </div>
        </div>

        <div className={`${styles['jg-term-evaluation-tool-wrapper']}`}>
          <div className={`${styles['jg-page-container']} ${styles['jg-padding-bottom-96-collapse']}`}>
            <div className={styles['jg-two-column-layout']}>
              <div className={`${styles['jg-column']} ${styles['jg-column-2-3']}`}>
                <SelectedToolComponent styles={styles}/>
              </div>
              <div className={`${styles['jg-column']} ${styles['jg-column-1-3']}`}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles['jg-footer']}`}>
        <div className={`${styles['jg-footer-inner']}`}>
          ideas, programming and design by Justin Guevara
        </div>
      </div>
    </div>
  );
};

const tools_list = {
  evaluate_terms: {
    id: 'evaluate_terms',
    label: 'evaluate terms',
    component: TermEvaluationTool
  },
  generate_strings: {
    id: 'generate_strings',
    label: 'generate strings',
    component: GenerateStringsTool
  },
  get_term_definitions: {
    id: 'get_term_definitions',
    label: 'term definitions',
    component: GetTermDefinitionTool
  },
  notes: {
    id: 'notes',
    label: 'text dump',
    component: NotesTool
  }
};
