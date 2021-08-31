import styled from 'styled-components';

const Container = styled.div`
  align-self: flex-start;

  max-width: 45%;

  font-weight: 600;

  &:before {
    content: 'Filtered Outcomes';
  }

  @media screen and (min-width: 768px) {
    align-self: center;

    max-width: none;
  }
`;

export default Container;
