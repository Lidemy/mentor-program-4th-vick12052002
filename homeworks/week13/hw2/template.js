export const cssTemplate = '.card{margin-top: 10px; }';
export function getForm(className, commentsClassName) {
  return `
      <form class="${className}">
       <div class="form-group">
        <label >暱稱</label>
        <input type="text" name="nickname" class="form-control" placeholder="請輸入暱稱">
        </div>
        <div class="form-group">
          <label>留言內容</label>
        <textarea name="content" class="form-control" ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${commentsClassName}"></div>`;
}
export function getLoadMoreBtn(className) {
  return `<button class="${className} btn btn-primary more-btn">More</button>`;
}
