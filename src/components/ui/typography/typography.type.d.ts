interface BaseProps {
  children: React.ReactNode;
  variant?:
    | 'p'
    | 'b'
    | 'span'
    | 'label'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
  color?: 'text-white' | 'text-black';
  className?: string;
}

interface LabelProps extends BaseProps {
  variant: 'label';
  htmlFor: string;
}

export type TypographyProps = BaseProps | LabelProps;
