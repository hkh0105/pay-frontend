import { noop } from 'lodash-es';
import * as React from 'react';

export const BackSpaceKeyCode = 8;
export const SpaceKeyCode = 32;
export const TabKeyCode = 32;
export const PlaceholderKeyCode = 229;

export interface FocusMovableInputProps {
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  refObject: React.RefObject<any>;
  maxLength: number;
  prevInputRef?: React.RefObject<any>;
  nextInputRef?: React.RefObject<any>;
  deletePrevInputLastChar?: () => void;
}

export class FocusMovableInput extends React.Component<
  FocusMovableInputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.ClassAttributes<HTMLInputElement>
> {
  public render() {
    const {
      onChange,
      onKeyUp = noop,
      refObject,
      maxLength,
      prevInputRef,
      nextInputRef,
      deletePrevInputLastChar = noop,
      ...restProps // rest type error due to generic(P): https://github.com/Microsoft/TypeScript/issues/10727
    } = this.props;

    return (
      <input
        ref={refObject}
        maxLength={maxLength}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.persist();
          const value = e.currentTarget.value;
          if (value.length > maxLength) {
            e.currentTarget.value = value.slice(0, maxLength);
            if (!!nextInputRef) {
              nextInputRef.current.focus();
            }
            return;
          }
          onChange(e);
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          e.persist();
          if (
            !e.keyCode ||
            // Check for placeholder keyCode 229 which has 'Unidentified' key (returned in Android browsers)
            // tslint:disable-next-line:max-line-length
            // https://m.blog.naver.com/PostView.nhn?blogId=tommybee&logNo=220887899552&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F
            e.key.length > 1 && e.keyCode !== PlaceholderKeyCode ||
            // Range of numbers from the numeric keboard and the numbers from the top of the keyboard
            !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
          ) {
            return;
          }
          if (nextInputRef && e.currentTarget.value.length >= maxLength) {
            nextInputRef.current.focus();
            return;
          }
          onKeyUp(e);
        }}
        {...restProps}
      />
    );
  }
}
