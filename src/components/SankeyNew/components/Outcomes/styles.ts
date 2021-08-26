import styled from 'styled-components';

const Container = styled.div`
  align-self: flex-start;

  max-width: 33.33%;

  font-weight: 600;

  &:before {
    content: 'Filtered Outcomes';
  }

  @media screen and (min-width: 768px) {
    align-self: flex-start;

    max-width: none;
  }
`;

export default Container;
