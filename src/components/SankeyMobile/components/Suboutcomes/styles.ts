import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import AccordionDetails from '@material-ui/core/AccordionDetails';

interface ContainerProps {
  color?: string;
}

const Container = styled(AccordionDetails)<ContainerProps>`
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  padding: 0px !important;

  flex-flow: column wrap;

  p {
    font-size: 12px;
  }

  ${props =>
    props.color &&
    css`
      background-color: ${transparentize(0.8, props.color)};
    `}
`;

export default Container;
