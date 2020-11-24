import Prism from 'prismjs';
// See https://github.com/PrismJS/prism/pull/1367
import 'prismjs/components/prism-markup-templating';

function escapeHTML(code) {
  code = code.replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
  return code;
}

export const highlightCodeCompiler = ({ renderer }) =>
  (renderer.code = function(code, lang = 'markup') {
    const langOrMarkup = Prism.languages[lang] || Prism.languages.markup;
    let text = lang
      ? Prism.highlight(code.replace(/@DOCSIFY_QM@/g, '`'), langOrMarkup, lang)
      : escapeHTML(code);

    let codeClass = '';
    const matchCodeClass = /\[CLASS (.+?)\]\n/.exec(text);
    if (matchCodeClass) {
      codeClass += ' class="' + matchCodeClass[1] + '"';
      text = text.replace(matchCodeClass[0], '');
    }

    return `<pre v-pre data-lang="${lang}"${codeClass}><code class="lang-${lang}">${text}</code></pre>`;
  });
