import * as classNames from 'classnames';
import { css, cx } from 'emotion';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg';
import { sceneContents, SceneWrapper } from 'app/components';
import { CardIssuerCode, cardIssuerStyleSets, CardPlateStyleSet } from 'app/constants/cards';
import { colors } from 'app/constants/colors';

export interface CardPlateProps {
  cardNumber: string;
  cardIssuerCode: CardIssuerCode;
  className?: string;
}

export const wrapper = css({
  position: 'relative',
  borderRadius: '6px',
  width: '240px',
  height: '140px',
  margin: '0 auto'
  // padding: '14px 18px',
});

export const cardNumber = css({
  position: 'absolute',
  left: '18px',
  bottom: '14px',
  margin: 0,
  color: '#fff',
  fontSize: '16px'
});

export const CardPlate: React.SFC<CardPlateProps> = (props) => {
  const styleSet = cardIssuerStyleSets[props.cardIssuerCode];
  return (
    <div className={classNames(wrapper, props.className)} style={{ backgroundColor: styleSet.backgroundColor }}>
      <p className={cardNumber}>{props.cardNumber}</p>
    </div>
  );
};

export const TestCardPlates: React.SFC = () => {
  const codes: CardIssuerCode[] = [
    'CCKM',
    'CCNH',
    'CCSG',
    'CCCT',
    'CCHM',
    'CVSF',
    'CCAM',
    'CCLO',
    'CCHN',
    'CCSS',
    'CCKJ',
    'CCSU',
    'CCJB',
    'CCCJ',
    'CCLG',
    'CMCF',
    'CJCF',
    'CCKE',
    'CCDI',
    'CCUF',
    'CCBC'
  ];
  return (
    <div>
      {codes.map((code) => {
        return (
          <CardPlate
            cardIssuerCode={code}
            key={code}
            cardNumber="1093 04** **** ****"
            className={css({ margin: '10px', display: 'inline-block' })}
          />
        )
      })}
    </div>
  )
};
