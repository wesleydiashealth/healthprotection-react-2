import styled from 'styled-components';

const Container = styled.div`
  position: relative;

  align-self: flex-start;

  max-width: 33.33%;

  font-weight: 600;

  &:before {
    content: 'Choose your Sub-outcomes';
  }

  &:after {
    content: 'Fine-tune';
    position: absolute;
    top: 0;
    left: 260px;
  }

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: none;
  }
`;

export default Container;
