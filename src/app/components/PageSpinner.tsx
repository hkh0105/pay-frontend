import { applyGraySpinner } from "app/styles";
import { css } from "emotion";
import * as React from 'react';
import { headerHeight } from "./Header";

interface Props {
  text?: string;
}

export const PageSpinner = (props: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.spinner} />
      {props.text && (
        <p className={s.text}>{props.text}</p>
      )}
    </div>
  );
}

const spinnerHeight = '30px';
const s = {
  wrapper: css({
    height: `calc(100% - ${headerHeight})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  spinner: css({
    width: '100%',
    height: spinnerHeight,
    ...applyGraySpinner(spinnerHeight),
  } as {}),
  text: css({
    color: '#59667a',
    fontSize: '14px',
    textAlign: 'center',
    margin: 0,
    paddingTop: '20px',
  }),
}