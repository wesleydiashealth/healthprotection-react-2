import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import Carousel from 'react-multi-carousel';
import * as Yup from 'yup';

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

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        age: Yup.string().required('Idade obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
