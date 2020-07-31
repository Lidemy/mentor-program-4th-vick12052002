document.querySelector('.question_section').addEventListener('click', (e) => {
  const element = e.target.closest('.answer_area');
  if (element.childNodes[3]) {
    element.childNodes[3].classList.toggle('show_answer');
  }
});
