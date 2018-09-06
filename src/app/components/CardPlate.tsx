import * as classNames from 'classnames';
import { css } from 'emotion';
import * as React from 'react';

import { CardIssuerCode, cardIssuerStyleSets } from 'app/constants/cards';

export interface CardPlateProps {
  cardNumber: string;
  cardIssuerCode: CardIssuerCode | null;
  className?: string;
}

const wrapper = css({
  position: 'relative',
  borderRadius: '6px',
  width: '240px',
  height: '140px',
  margin: '0 auto',
  padding: '10px',
});

const cardNumberText = css({
  position: 'absolute',
  left: '18px',
  bottom: '14px',
  margin: 0,
  color: '#fff',
  fontSize: '16px'
});

const cardLogoImageWrapper = css({
  display: 'inline-block',
});

const cardLogoImage = css({
  width: '50%',
})

const emptyCardPlaceholderText = css({
  position: 'absolute',
  color: colors.bluegray_20,
  fontSize: '13px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

const emptyCardPlate = css({
  border: `2px solid ${colors.bluegray_5}`,
  borderRadius: '6px',
})

export const CardPlate: React.SFC<CardPlateProps> = ({ cardIssuerCode, cardNumber, className }) => {
  const backgroundColor = cardIssuerCode
    ? cardIssuerStyleSets[cardIssuerCode].backgroundColor
    : '#fff';
  return (
    <div
      className={classNames(wrapper, className, { [emptyCardPlate]: !cardIssuerCode })}
      style={{ backgroundColor }}
    >
      {cardIssuerCode
        ? <>
          <span className={cardLogoImageWrapper}>
            <img
              className={cardLogoImage}
              src={`/public/images/card_logo/logo_${cardIssuerCode.toLowerCase()}.png`}
              alt="카드 이미지"
            />
          </span>
          <p className={cardNumberText}>{cardNumber}</p>
        </>
        : <span className={emptyCardPlaceholderText}>등록된 카드가 없습니다.</span>
      }
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
