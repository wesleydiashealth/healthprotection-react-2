import React, { useState, useCallback, useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import ReactHtmlParser from 'react-html-parser';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';

import { useApp } from 'contexts/app';
import Input from 'components/Input';

import getValidationErrors from 'utils/getValidationErrors';

import Container, {
  Title,
  Form,
  PopupTrigger,
  PopupContent,
  ConsentTitle,
  ConsentText,
  AdvertisementsIntro,
  AdvertisementsFieldset,
  AdvertisementsText,
} from './styles';

const Report: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const formRef = useRef<FormHandles>(null);

  const [userConsent, setUserConsent] = useState<boolean>(false);
  const [newsletterConsent, setNewsletterConsent] = useState<boolean>(true);

  const handleSubmit = useCallback(async (data: HTMLFormElement) => {
    // eslint-disable-next-line no-console
    console.log(data);

    try {
      formRef.current?.setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Title>{labels.newsletter_title}</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="E-mail*" />
        <label htmlFor="user_consent" aria-required>
          <Input
            type="checkbox"
            name="user_consent"
            onClick={() => {
              setUserConsent(!userConsent);
            }}
          />
          <Popup
            trigger={<PopupTrigger>{labels.newsletter_agree}</PopupTrigger>}
            modal
            nested
          >
            <PopupContent>
              <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
                <ConsentTitle>{labels.newsletter_consent_title}</ConsentTitle>
                <ConsentText>
                  {labels.newsletter_consent_text &&
                    ReactHtmlParser(labels.newsletter_consent_text)}
                </ConsentText>
                <AdvertisementsIntro>
                  {labels.newsletter_consent_advertisements &&
                    ReactHtmlParser(labels.newsletter_consent_advertisements)}
                </AdvertisementsIntro>
                <AdvertisementsFieldset id="newsletter_policy">
                  <label htmlFor="newsletter_policy_accept">
                    <Input
                      type="radio"
                      name="newsletter_policy"
                      value="true"
                      checked={!!newsletterConsent}
                      onChange={() => {
                        setNewsletterConsent(true);
                      }}
                    />
                    {labels.newsletter_consent_advertisements_accept}
                  </label>
                  <label htmlFor="newsletter_policy_dont_accept">
                    <Input
                      type="radio"
                      name="newsletter_policy"
                      value="false"
                      checked={!newsletterConsent}
                      onChange={() => {
                        setNewsletterConsent(false);
                      }}
                    />
                    {labels.newsletter_consent_advertisements_dont_accept}
                  </label>
                </AdvertisementsFieldset>
                <AdvertisementsText>
                  {labels.newsletter_consent_advertisements_text &&
                    ReactHtmlParser(
                      labels.newsletter_consent_advertisements_text,
                    )}
                </AdvertisementsText>
              </Scrollbar>
            </PopupContent>
          </Popup>
        </label>
        <input type="submit" value="View report" disabled={!userConsent} />
        {/* <PDFDownloadLink
          document={
            <ReportDocument
              {...{
                answers,
                outcomes,
                suboutcomes,
                selectedConnections,
                excludes,
                habits,
                sankeyImg,
              }}
            />
          }
        >
          Download
        </PDFDownloadLink> */}
      </Form>
    </Container>
  );
};

export default Report;
