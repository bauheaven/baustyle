import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { variant, color, typography } from 'styled-system';

const Element: React.FC<{ variant: string; children: ReactNode } & any> = ({
  variant,
  children,
  ...props
}) => React.createElement(variant, props, children);

export const Heading = styled(Element)(
  variant({
    scale: 'heading',
    variants: {
      primary: {},
    },
  }),
  color
);

export const Text = styled.p(
  variant({
    scale: 'text',
    variants: {
      primary: {},
    },
  }),
  typography
);
