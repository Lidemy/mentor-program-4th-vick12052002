/* eslint-disable function-paren-newline */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Form from './components/Form';
import { questionArray, checkValid } from './utils';

const formTitle = '新拖延運動報名表單';

function App() {
  const isValid = false;
  let hasError = false;
  const answers = {};
  const [questions, setQuestions] = useState(questionArray);
  const [values, setValue] = useState({ name: '' });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    const newQuestions = questions.map((question) => {
      if (question.title !== name) return question;
      return {
        ...question,
        value,
        isValid,
      };
    });
    setValue({ [name]: value });
    setQuestions(newQuestions);
  };
  const handleCheckInputValue = (e) => {
    e.preventDefault();
    // 檢查問題是否必填，不是則回傳
    const checkIsValid = questions.map((question) => {
      if (!question.required) {
        return question;
      }
      if (question.value.length === 0) {
        return { ...question, isValid: true };
      }
      if (checkValid(question)) {
        return { ...question, isValid };
      }
      return { ...question, isValid: true };
    });
    setQuestions(checkIsValid);
    // 檢查是否還有符合規定的資料格式或空值，如果無，則回傳 undefined
    const checkError = checkIsValid.find(item => item.isValid === true);
    if (typeof checkError !== 'undefined') {
      hasError = true;
    }
    if (!hasError) {
      for (let i = 0; i < questions.length; i += 1) {
        answers[questions[i].title] = questions[i].value;
      }
      alert(JSON.stringify(answers));
      window.location.reload();
    }
  };
  return (
    <Form
      formTitle={formTitle}
      questions={questions}
      inputValue={values}
      handleInputChange={handleInputChange}
      handleCheckInputValue={handleCheckInputValue}
    />
  );
}

export default App;
