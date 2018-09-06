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
}

export type CardIssuerStyleSets = { [key in CardIssuerCode]: CardPlateStyleSet };

export const cardIssuerStyleSets: CardIssuerStyleSets = {
  CCKM: { backgroundColor: '#766c60' },
  CCNH: { backgroundColor: '#02469b' },
  CCSG: { backgroundColor: '#68737a' },
  CCCT: { backgroundColor: '#0057a0' },
  CCHM: { backgroundColor: '#0057a0' },
  CVSF: { backgroundColor: '#192269' },
  CCAM: { backgroundColor: '#c4000d' },
  CCLO: { backgroundColor: '#c4000d' },
  CCHN: { backgroundColor: '#008275' },
  CCSS: { backgroundColor: '#101010' },
  CCKJ: { backgroundColor: '#012d6b' },
  CCSU: { backgroundColor: '#0083cb' },
  CCJB: { backgroundColor: '#012e85' },
  CCCJ: { backgroundColor: '#0083cb' },
  CCLG: { backgroundColor: '#131741' },
  CMCF: { backgroundColor: '#ffc841' },
  CJCF: { backgroundColor: '#1b78d1' },
  CCKE: { backgroundColor: '#008275' },
  CCDI: { backgroundColor: '#191919' },
  CCUF: { backgroundColor: '#454545' },
  CCBC: { backgroundColor: '#c4000d' }
};

// interface CardIssuerStyleSets {
//   [code in CardIssuerCode]: CardPlateStyleSet;
//   a: {

//   }
// }
