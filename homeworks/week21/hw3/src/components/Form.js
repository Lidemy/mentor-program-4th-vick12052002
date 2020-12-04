/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { memo } from 'react';
import Input, { MemoDescInfo, MemoRequired } from './Input';
import MemoFooter from './Footer';

const WrapperForm = styled.div`
  max-width: 645px;
  margin: 60px auto;
  background-color: #fff;
  border-top: solid 6px #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 30px 40px;
`;
const Title = styled.h1`
  margin-bottom: 2rem;
  font-weight: bold;
`;
const Description = styled.div`
`;
const Button = styled.button`
  margin-top: 2em;
  padding:0.8em 1.3em;
  border-radius: 3px;
  border:none;
  background-color: #fad312;
  cursor: pointer;
`;
const MemoTitle = memo(({ title }) => (
  <Title>
    {title}
  </Title>
));
function Form({
  formTitle, questions, inputValue, handleInputChange, handleCheckInputValue,
}) {
  return (
    <>
      <WrapperForm>
        <MemoTitle title={formTitle} />
        <Description>
          <MemoDescInfo>活動日期：2020/12/10 ~ 2020/12/11</MemoDescInfo>
          <MemoDescInfo>活動地點：台北市大安區新生南路二段1號</MemoDescInfo>
          <MemoRequired content="* 必填" />
        </Description>
        <form>
          {questions.map(question => (
            <Input
              key={question.title}
              inputTitle={question.title}
              inputType={question.type}
              inputValue={question.value || inputValue[question.title] || ''}
              options={question.options}
              required={question.required}
              isValid={question.isValid}
              placeholder={question.placeholder}
              desc={question.desc}
              handleInputChange={handleInputChange}
            />
          ))}
          <Button onClick={handleCheckInputValue}>提交</Button>
          <MemoDescInfo>請勿透過表單送出您的密碼。</MemoDescInfo>
        </form>
      </WrapperForm>
      <MemoFooter />
    </>
  );
}

export default Form;
