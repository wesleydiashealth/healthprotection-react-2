import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Carousel from 'react-multi-carousel';
import * as Yup from 'yup';
import { IoChatbubblesOutline } from 'react-icons/io5';
import getValidationErrors from '../../utils/getValidationErrors';

import Container from './styles';
import 'react-multi-carousel/lib/styles.css';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';

const Wizard: React.FC = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: HTMLFormElement) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        age: Yup.string().required('Idade obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container id="step_1">
      <div className="step-intro content-wrapper">
        <IoChatbubblesOutline size={52} color="#7664C8" />
        <h2>Step 1</h2>
        <h3>
          <strong>Start</strong> by talking a little about yourself
        </h3>
        <span>
          Doing this step is critical to narrow down all more than 500 products,
          17 possible outcomes and 43 sub-outcomes
        </span>
      </div>
      <Form ref={formRef} onSubmit={handleSubmit} className="content-wrapper">
        <Carousel
          centerMode
          focusOnSelect
          arrows={false}
          showDots
          responsive={responsive}
        >
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
          <Step5 />
          <Step6 />
          <Step7 />
        </Carousel>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
};

export default Wizard;
