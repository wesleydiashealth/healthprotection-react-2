import React, { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import { ButtonGroupProps } from 'react-multi-carousel/lib/types';
import { useField } from '@unform/core';

import Container from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  isActive: boolean;
}

const Button: React.FC<ButtonProps & ButtonGroupProps> = ({
  name,
  children,
  ...rest
}) => {
  const inputRef = useRef<HTMLButtonElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      type="button"
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Button;
