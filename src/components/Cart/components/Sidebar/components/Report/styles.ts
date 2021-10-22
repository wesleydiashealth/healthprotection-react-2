import styled from 'styled-components';
import { transparentize } from 'polished';
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

      cursor: pointer;

      font-weight: 700;
      color: white;
      text-transform: uppercase;

      background: #ffae30;

      &:disabled {
        cursor: initial;
        background: ${transparentize(0.4, '#ffae30')};
      }
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
  text-align: justify;

  strong {
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 22px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  ul {
    margin: 0 0 20px 20px;

    font-size: 14px;
    line-height: 22px;
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

  @media screen and (min-width: 768px) {
    p,
    ul {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export const ConsentTitle = styled.h5`
  margin-bottom: 20px;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  @media screen and (min-width: 768px) {
    font-size: 22px;
    line-height: 30px;
  }
`;

export const ConsentText = styled.div``;

export const AdvertisementsIntro = styled.div`
  margin-top: 20px;
`;

export const AdvertisementsFieldset = styled.fieldset`
  border: none;
  padding: 20px 0;

  display: flex;
  align-items: center;

  label {
    margin: 0;

    font-size: 14px;
    line-height: 22px;

    & ~ label {
      margin-left: 20px;
    }

    input {
      margin-right: 5px;
    }
  }

  @media screen and (min-width: 768px) {
    label {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export const AdvertisementsText = styled.div``;

export default Container;
