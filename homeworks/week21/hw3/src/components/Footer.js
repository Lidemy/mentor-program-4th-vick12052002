import styled from 'styled-components';
import React, { memo } from 'react';

const FooterWrapper = styled.div`
  background-color: #000;
  display:block;
`;
const FooterContent = styled.p`
  color: #999999;
  font-size: 13px;
  text-align: center;
  line-height: 3em;
  margin:0;
`;
const MemoFooter = memo(() => (
  <FooterWrapper>
    <FooterContent>&copy; 2020 &copy; Copyright. All rights Reserved</FooterContent>
  </FooterWrapper>
));

export default { MemoFooter };
