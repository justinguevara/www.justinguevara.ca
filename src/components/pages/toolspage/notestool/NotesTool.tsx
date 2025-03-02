import { useState,
  useRef,
  useEffect,
  ChangeEvent } from "react";

interface NotesToolProps {
  root_class?: string;
  styles: { [key: string]: string };
}

export default function NotesTool({
  root_class = 'default',
  styles
}: NotesToolProps): JSX.Element {
  const [content, setContent] = useState('');
  const [hide_content_caret, setHideContentCaret] = useState(false);
  const [is_loading, setIsLoading] = useState(true);

  useEffect(() => {
    setContent(localStorage.getItem('text_dump'));
    setTimeout(function () {
      setIsLoading(false);
    }, 1000);
  }, []);

  // debounce block
  const last_hit = useRef(null);
  const last_timeout_function = useRef(null);

  // debounce block
  const minimum_hit_interval: number = 1000;
  const handleTextEditorContentChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void = function (event) {
    const new_content = event.target.value;
    let time_until_next_hit;
    setContent(new_content);
    const now: number = Date.now();
    clearTimeout(last_timeout_function.current);

    if (now === null || now > (last_hit.current + minimum_hit_interval)) {
      time_until_next_hit = 0;
    } else {
      time_until_next_hit = minimum_hit_interval - (now - last_hit.current);
    }

    last_timeout_function.current = setTimeout(function () {
      localStorage.setItem('text_dump', new_content);
      last_hit.current = Date.now();
    }, time_until_next_hit);
  };

  const character_count: number = content.length;
  const is_windows: boolean = content.indexOf('\t') !== -1;
  const line_count: number = content.length === 0 ? 0 : content.split(is_windows ? '\r\n' : '\n').length;

  // rework tab key behaviour when text area is focused
  const handleKeyDown = (event) => {
    const caret_start = event.target.selectionStart;
    const caret_end = event.target.selectionEnd;
    const current_content = event.target.value;

    if (event.key === 'Tab') {
      event.preventDefault();
      // Tab + Shift
      if (event.shiftKey) {
        let adjust_cursor = false;
        if (current_content.charAt(caret_start - 1) === "\t" ) {
          const updated_content: string = current_content.substring(0, caret_start - 1) +
            current_content.substring(caret_start);
          adjust_cursor = true;
          setContent(updated_content); 
          // hide caret until caret is in the correct position
          setHideContentCaret(true);
        }

        if (adjust_cursor === true) {
          // update cursor position after DOM has been updated
          setTimeout(() => {
            event.target.selectionStart = caret_start -1;
            event.target.selectionEnd = caret_start - 1;
            setHideContentCaret(false);
          }, 0);
        }
      // Tab
      } else {
        const updated_content: string = current_content.substring(0, caret_start) +
          "\t" + current_content.substring(caret_end);
        setContent(updated_content);
        // update cursor position after DOM has been updated
        // hide caret until caret is in the correct position
        setHideContentCaret(true);
        setTimeout(() => {
          event.target.selectionStart = caret_start + 1;
          event.target.selectionEnd = caret_start + 1;
          setHideContentCaret(false);
        }, 0);
      }
    }
  };

  let text_editor_classes: string|string[] = [ styles['jg-text-editor'] ];
  if (hide_content_caret === true) {
    text_editor_classes.push(styles['jg-hide-caret']);
  }
  text_editor_classes = text_editor_classes.join(' ');
  return (
    <div className={`${styles['jg-generate-strings-tool']}`}>
      <h1 className={`${styles['jg-page-heading']} ${styles['jg-content-margin-top']}`}>
        Text dump
      </h1>
      <div className={`${styles['jg-padding-single-indent-collapse']} ${styles['jg-width-66-collapse']}`}>
        An online text dump. Text will persist until deleted through this UI or until browser storage has been cleared. 
        Supports certain common text editor tab key behaviours.
      </div>
      <div className={`${styles['jg-margin-top-50']} ${styles['jg-padding-8-collapse']}`}>
        <textarea
          className={text_editor_classes}
          spellcheck="false"
          disabled={is_loading}
          onChange={handleTextEditorContentChange}
          onKeyDown={handleKeyDown}
          value={content}
          placeholder={'...'}
        ></textarea>
        <div className={`${styles['jg-text-editor-footer']}`}>
          <div className={`${styles['jg-text-editor-footer-child']}`}>Lines {line_count}</div>
          <div className={`${styles['jg-text-editor-footer-child']}`}>Characters {character_count}</div>
        </div>
      </div>
    </div>
  );
}