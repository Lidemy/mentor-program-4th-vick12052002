// eslint-disable-next-line import/no-unresolved
import $ from 'jquery';
import { getComments, addComment } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getLoadMoreBtn, getForm } from './template';

function loadComments(container, data) {
  for (let i = 0; i < data.length; i += 1) {
    const comment = data[i];
    appendCommentToDOM(container, comment);
  }
}

// eslint-disable-next-line import/prefer-default-export
export function init(options) {
  let commentsDOM = null;
  let lastId = null;
  let containerElement = null;

  const { siteKey, apiUrl } = options;
  containerElement = $(options.container);
  const loadMoreClassName = `${siteKey}-load-more-btn`;
  const commentClassName = `${siteKey}-comments`;
  const commentsSelector = `.${commentClassName}`;
  const formClassName = `${siteKey}-add-comments-form`;
  const formSelector = `.${formClassName}`;

  containerElement.append(getForm(formClassName, commentClassName));
  appendStyle(cssTemplate);
  function getNewComments() {
    getComments(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      loadComments(commentsDOM, comments);
      const { length } = comments;
      // 假如 comment 少於五則，就直接回傳，不執行下面程式碼
      if (length < 5) {
        return;
      }
      lastId = comments[length - 1].id;
      const loadMoreBtn = getLoadMoreBtn(loadMoreClassName);
      commentsDOM.append(loadMoreBtn);
    });
  }
  commentsDOM = $(commentsSelector);
  getNewComments();
  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    $(`.${loadMoreClassName}`).remove();
    getNewComments();
  });
  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    let newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComment(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      newCommentData = data.discussions;
      appendCommentToDOM(commentsDOM, newCommentData, true);
      nicknameDOM.val('');
      contentDOM.val('');
    });
  });
}
