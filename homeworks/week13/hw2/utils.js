/* eslint-disable no-useless-escape */
export function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}
export function appendCommentToDOM(container, comment, isPrepend) {
  const element = `
          <div class="card">
            <div class="card-body">
            <h5 class="card-title"> ${escape(comment.nickname)}</h5>
            <p class="card-subtitle mb-2 text-muted">${escape(comment.created_time)}</p>
            <p class="card-text">${escape(comment.content)}</p>
          </div>`;
  if (isPrepend) {
    container.prepend(element);
  } else {
    container.append(element);
  }
}

export function appendStyle(cssTemp) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemp));
  document.head.appendChild(styleElement);
}
