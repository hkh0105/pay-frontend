export type CardIssuerCode =
  | 'CCKM'
  | 'CCNH'
  | 'CCSG'
  | 'CCCT'
  | 'CCHM'
  | 'CVSF'
  | 'CCAM'
  | 'CCLO'
  | 'CCHN'
  | 'CCSS'
  | 'CCKJ'
  | 'CCSU'
  | 'CCJB'
  | 'CCCJ'
  | 'CCLG'
  | 'CMCF'
  | 'CJCF'
  | 'CCKE'
  | 'CCDI'
  | 'CCUF'
  | 'CCBC'; // BC카드, 우리카드, 신협카드, 현대증권카드, 저축카드, 산업카드

// type CardIssuerCode

export interface CardPlateStyleSet {
  backgroundColor: string;
  leftIconName: string;
  rightIconName?: string;
}

export type CardIssuerStyleSets = { [key in CardIssuerCode]: CardPlateStyleSet };

export const cardIssuerStyleSets: CardIssuerStyleSets = {
  CCKM: { backgroundColor: '#766c60', leftIconName: 'test' },
  CCNH: { backgroundColor: '#02469b', leftIconName: 'test' },
  CCSG: { backgroundColor: '#68737a', leftIconName: 'test' },
  CCCT: { backgroundColor: '#0057a0', leftIconName: 'test' },
  CCHM: { backgroundColor: '#0057a0', leftIconName: 'test' },
  CVSF: { backgroundColor: '#192269', leftIconName: 'test' },
  CCAM: { backgroundColor: '#c4000d', leftIconName: 'test' },
  CCLO: { backgroundColor: '#c4000d', leftIconName: 'test' },
  CCHN: { backgroundColor: '#008275', leftIconName: 'test' },
  CCSS: { backgroundColor: '#101010', leftIconName: 'test' },
  CCKJ: { backgroundColor: '#012d6b', leftIconName: 'test' },
  CCSU: { backgroundColor: '#0083cb', leftIconName: 'test' },
  CCJB: { backgroundColor: '#012e85', leftIconName: 'test' },
  CCCJ: { backgroundColor: '#0083cb', leftIconName: 'test' },
  CCLG: { backgroundColor: '#131741', leftIconName: 'test' },
  CMCF: { backgroundColor: '#ffc841', leftIconName: 'test' },
  CJCF: { backgroundColor: '#1b78d1', leftIconName: 'test' },
  CCKE: { backgroundColor: '#008275', leftIconName: 'test' },
  CCDI: { backgroundColor: '#191919', leftIconName: 'test' },
  CCUF: { backgroundColor: '#454545', leftIconName: 'test' },
  CCBC: { backgroundColor: '#c4000d', leftIconName: 'test' }
};

// interface CardIssuerStyleSets {
//   [code in CardIssuerCode]: CardPlateStyleSet;
//   a: {

//   }
// }
