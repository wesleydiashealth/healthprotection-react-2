import React, { useState, useCallback } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Container from './styles';

import Input from '../Input';
import Button from '../Button';

const Wizard: React.FC = () => {
  const [age, setAge] = useState('');

  const inputs = {
    step1: [
      {
        value: '18-30',
        label: '18-30',
      },
      {
        value: '31-40',
        label: '31-40',
      },
      {
        value: '41-50',
        label: '41-50',
      },
    ],
  };

  const handleInputChange = useCallback((data: any) => {
    const inputValue = data.target.id;

    setAge(inputValue);
  }, []);

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
        {inputs.step1.map(input => (
          <label key={input.value} htmlFor={input.value}>
            <Input
              type="radio"
              id={input.value}
              name="age"
              value={age}
              checked={age === input.value}
              onChange={handleInputChange}
            />
            {input.label}
          </label>
        ))}
        <Button type="submit">Enviar</Button>
      </Form>
    </Container>
  );
};

export default Wizard;
