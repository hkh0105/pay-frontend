import { colors } from 'app/constants/colors';
import { css } from 'emotion';
import * as React from 'react';

interface Props {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  className?: string;
  id: string;
}

export const SwtichButton: React.SFC<Props> = (props) => {
  const { className = '', id, isChecked, onChange } = props;
  return (
    <label className={className} htmlFor={id}>
      <div className={inputToggle}>
        <input className={inputCheckbox} id={id} type="checkbox" checked={isChecked} onChange={onChange} />
        <span className={inputToggleHandle} />
      </div>
    </label>
  );
};

const inputToggle = css`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  // &:before {
  //   content: "ON";
  //   left: 0;
  //   color: #fff; }

  // &:after {
  //   content: "OFF";
  //   right: 0;
  //   color: #fff; }

  // &:before,
  // &:after {
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   padding: 12px 16px;
  //   font-size: 12px;
  //   font-weight: bold;
  //   z-index: 0; }
`;

const inputToggleHandle = css`
  display: block;
  width: 56px;
  height: 28px;
  background-color: ${colors.green_30};
  border-radius: 16px;
  transition: .2s ease;
  // box-shadow: inset 0 1px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 44px 44px ${colors.slategray_20};
  box-shadow:
    inset 0 0 rgba(0, 0, 0, 0),
    inset 0 0 0 0 rgba(0, 0, 0, 0),
    inset 0 0 0 rgba(0, 0, 0, 0),
    inset 44px 44px ${colors.slategray_20};
  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 20px;
    transition: .2s ease;
    background: #fff;
    border-radius: 10em;
    box-shadow: 1px 1px 4px 0 ${colors.slategray_50};
    // box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  &:after {
    content: 'OFF';
    color: #fff;
    right: 6px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    font-size: 12px;
    line-hegiht: 12px;
    font-weight: bold;
    z-index: 0;
  }
`;

const inputCheckbox = css`
  appearance: none;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  &:checked ~ .${inputToggleHandle} {
    box-shadow: inset 0 0 rgba(0, 0, 0, 0.15), inset 0 0 0 0 #31a2a8;

    &:before {
      left: calc(100% - 24px);
      // box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px #31a2a8, 0 1px 2px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    &:after {
      content: 'ON';
      right: auto;
      left: 8px;
    }
  }
`;
