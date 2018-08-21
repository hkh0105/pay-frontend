import * as classNames from 'classnames';
import * as React from 'react';

import { FocusMovableInput, FocusMovableInputProps } from 'app/components';
import { numberOnly, NumberOnlyProps } from 'app/hocs';

export type BaseInputProps =
  FocusMovableInputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  {
    value: string;
    isObscured?: boolean;
  };

const BaseInput: React.SFC<BaseInputProps> = ({
  refObject,
  maxLength,
  onChange,
  value,
  isObscured = false,
  className,
  ...restProps
}) => (
  <FocusMovableInput
    refObject={refObject}
    maxLength={maxLength}
    className={classNames([
      'RegisterCreditCard_InnerInput',
      { 'RegisterCreditCard_InnerInput-obscured': isObscured },
      { 'RegisterCreditCard_InnerInput-empty': value.length === 0 },
      className,
    ])}
    autoCorrect="off"
    value={value}
    onChange={onChange}
    {...restProps}
  />
);

export type CardInputProps = BaseInputProps & NumberOnlyProps;
export const CardInput = numberOnly<BaseInputProps>(BaseInput);
