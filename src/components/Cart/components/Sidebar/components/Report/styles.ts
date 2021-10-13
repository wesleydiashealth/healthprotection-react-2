import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

const Container = styled.div``;

export const Title = styled.h4`
  margin-bottom: 20px;

  font-size: 18px;
  line-height: 26px;
`;

export const Form = styled(Unform)`
  display: flex;
  flex-flow: column;

  input {
    &[type='text'] {
      border: 1px solid #e5e5e5;
      border-radius: 24px;
      padding: 8px 20px;

      width: 100%;
    }

    &[type='submit'] {
      border: none;
      border-radius: 32px;
      padding: 16px 24px;

      font-weight: 700;
      color: white;
      text-transform: uppercase;

      background: #ffae30;
    }
  }

  label {
    margin: 10px 0 20px;

    display: flex;
    align-items: center;

    font-size: 14px;
    line-height: 22px;
    text-decoration: underline;

    cursor: pointer;

    &:hover {
      text-decoration: none;
    }

    input {
      &[type='checkbox'] {
        margin-right: 10px;
      }
    }
  }
`;

export const PopupTrigger = styled.span`
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export const PopupContent = styled.div`
  padding: 20px;

  text-align: justify;

  p {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  label {
    margin-bottom: 20px;

    display: flex;
    align-items: center;

    input {
      &[type='checkbox'] {
        margin-right: 10px;
      }
    }
  }
`;

export default Container;
