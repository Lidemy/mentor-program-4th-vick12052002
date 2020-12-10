/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { memo } from 'react';

const WrapperInput = styled.label`
  margin-top: 20px;
  display:block;
`;
const InputTitle = styled.h3`
  padding-top: 15px;
  font-weight:normal;
`;
const InputStyle = styled.input`
  font-size:1em;
  border:1px solid #aaa;
  padding:0.5em;
`;
const Required = styled.span`
  color: #e74149; 
  margin-left:0.5em;
  font-size:1rem;
`;
const DescInfo = styled.p`
  font-size:0.9em;
  color:black;
  line-height:1em;
`;
const ErrorMessage = ({ className, type, content }) => (
  <p className={className}>
    {type === 'text'
      || type === 'radio' ? content
      : `請輸入完整的${type === 'email' ? '電子郵件' : '手機號碼'}`}
  </p>
);
const StyledError = styled(ErrorMessage)`
  color: red;
  position: absolute;
  margin:0;
`;
const MemoRequired = memo(({ content }) => <Required>{content}</Required>);
const MemoTitle = memo(({ inputTitle, required }) => (
  <InputTitle>
    {inputTitle}
    {required ? <MemoRequired content="*" /> : ''}
  </InputTitle>
));

const MemoDescInfo = memo(({ children }) => <DescInfo>{children}</DescInfo>);
function InputRadio({
  options, type, title, onChange,
}) {
  return (
    <div>
      {options.map(
        option => (
          <WrapperInput key={option.id} htmlFor={`data_${option.id}`}>
            <InputStyle
              input-name={title}
              value={option.content}
              type={type}
              id={`data_${option.id}`}
              name={title}
              onChange={onChange}
            />
            {option.content}
          </WrapperInput>
        ),
      )
      }
    </div>
  );
}
function Input({
  inputTitle, inputType, required, options, placeholder, desc, isValid, handleInputChange, inputValue,
}) {
  return (
    <WrapperInput key={inputTitle}>
      <MemoTitle
        inputTitle={inputTitle}
        required={required}
      />
      {desc ? <MemoDescInfo children={desc} /> : ''}
      {inputType !== 'radio'
        ? (
          <InputStyle
            name={inputTitle}
            onChange={handleInputChange}
            placeholder={placeholder}
            type={inputType}
            value={inputValue}
          />
        )
        : (
          <InputRadio
            options={options}
            type={inputType}
            title={inputTitle}
            onChange={handleInputChange}
          />
        )}
      {isValid && required && <StyledError type={inputType} content={placeholder} />}
    </WrapperInput>
  );
}
export { MemoDescInfo, MemoRequired };
export default Input;
