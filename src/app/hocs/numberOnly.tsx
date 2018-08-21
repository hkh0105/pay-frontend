import * as React from 'react';

export interface NumberOnlyProps {
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  pattern?: string;
  allowSpace?: boolean;
}

export const numberOnly = <P extends object>(
  InputComponent: React.ComponentType<
    P &
    React.InputHTMLAttributes<HTMLInputElement>
  >,
): React.SFC<
  P &
  NumberOnlyProps &
  React.InputHTMLAttributes<HTMLInputElement>
> => ({
  onChange,
  pattern,
  allowSpace = false,
  ...restProps // rest type error due to generic(P): https://github.com/Microsoft/TypeScript/issues/10727
}: NumberOnlyProps) => (
    <InputComponent
      type="tel"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        const testRegex = allowSpace ? /[^\d ]/ : /[^\d]/;
        if (testRegex.test(value)) {
          e.currentTarget.value = value.replace(testRegex, '');
          return;
        } else {
          onChange(e);
        }
      }}
      pattern={pattern || (allowSpace ? '[0-9 ]+' : '[0-9]+')}
      {...restProps}
    />
  );
