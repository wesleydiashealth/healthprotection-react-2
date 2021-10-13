import React, { useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';
// import { PDFDownloadLink } from '@react-pdf/renderer';

import { useApp } from 'contexts/app';
// import ReportDocument from 'components/ReportDocument';
import Input from 'components/Input';

import getValidationErrors from 'utils/getValidationErrors';

import Container, { Title, Form, PopupTrigger, PopupContent } from './styles';

const Report: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const formRef = useRef<FormHandles>(null);

  const [blogCheckbox, setBlogCheckbox] = useState<boolean>(true);
  const [newsletterCheckbox, setNewsletterCheckbox] = useState<boolean>(true);

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
        <label htmlFor="privacy_policy" aria-required>
          <Input type="checkbox" id="privacy_policy" name="privacy_policy" />
          <Popup
            trigger={<PopupTrigger>{labels.newsletter_agree}</PopupTrigger>}
            modal
            nested
          >
            <PopupContent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                dictum nulla sed mauris commodo consectetur. Integer mi leo,
                auctor et arcu in, bibendum iaculis ipsum. Pellentesque congue
                non augue quis dictum. Etiam ac purus a est dignissim faucibus
                in ac enim. Aliquam molestie scelerisque neque, eget iaculis
                eros tempor sit amet. Donec elementum dapibus viverra. Praesent
                feugiat tincidunt diam ut aliquet. Curabitur ultrices odio sit
                amet felis tempor varius.
              </p>
              <label htmlFor="blog_policy">
                <Input
                  type="checkbox"
                  id="blog_policy"
                  name="blog_policy"
                  checked={!!blogCheckbox}
                  onChange={() => {
                    setBlogCheckbox(!blogCheckbox);
                  }}
                />
                {labels.newsletter_agree_blog}
              </label>
              <p>
                Nulla imperdiet aliquam metus. Etiam interdum lorem sed porta
                egestas. Morbi suscipit orci eros, ut cursus leo dignissim vel.
                Curabitur pretium mattis mi eget gravida. Maecenas non risus eu
                ipsum rhoncus placerat. Fusce blandit vehicula dolor. Vestibulum
                sed odio ornare, imperdiet est eget, bibendum ligula. Fusce eu
                vehicula turpis. Integer accumsan porta condimentum. Morbi sit
                amet massa mi.
              </p>
              <label htmlFor="newsletter_policy">
                <Input
                  type="checkbox"
                  id="newsletter_policy"
                  name="newsletter_policy"
                  checked={!!newsletterCheckbox}
                  onChange={() => {
                    setNewsletterCheckbox(!newsletterCheckbox);
                  }}
                />

                {labels.newsletter_agree_newsletter}
              </label>
              <p>
                Fusce fermentum justo diam, sit amet ornare justo lacinia ut.
                Proin ligula lorem, vestibulum et ante eget, tincidunt euismod
                diam. Integer malesuada ligula purus, ac tempor sem scelerisque
                a. Fusce finibus sem at sapien mattis finibus. Phasellus eget
                lectus ut dui scelerisque maximus et vel orci. Proin eleifend
                purus vitae scelerisque pulvinar. Vestibulum eu gravida nibh.
                Quisque at volutpat mauris. Proin consequat non elit quis
                pretium. Donec porttitor venenatis leo, ac maximus tellus
                volutpat tincidunt. Sed odio quam, varius at efficitur nec,
                vehicula at est. Phasellus eros mauris, maximus et arcu ut,
                commodo vestibulum massa. Proin tincidunt lobortis sapien in
                porttitor. Morbi commodo augue nec lorem tristique scelerisque.
                In sed libero varius, venenatis nunc eget, gravida nibh.
              </p>
            </PopupContent>
          </Popup>
        </label>
        <input type="submit" value="View report" />
      </Form>
    </Container>
  );
};

export default Report;
