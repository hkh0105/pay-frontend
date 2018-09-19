import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button, Icon } from '@ridi/rsg';
import { ConnectedSceneWrapper } from 'app/components';
import { colors } from 'app/constants/colors';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';

export class LegalTerms extends React.PureComponent {
  private renderItem = (name: string, href: string) => {
    return (
      <li className={s.item}>
        <div className={s.itemName}>{name}</div>
        <a className={s.itemLink} href={href} target="_blank">
          내용 보기
          <Icon name="arrow_5_right" className={s.itemArrowIcon} />
        </a>
      </li>
    )
  }

  public render() {
    return (
      <ConnectedSceneWrapper>
        <Helmet>
          <title>이용약관 - 리디페이</title>
        </Helmet>
        <ul className={s.wrapper}>
          {this.renderItem('서비스 이용약관', 'http://ridi-terms.s3-website.ap-northeast-2.amazonaws.com/ridi-pay/terms-of-use')}
          {this.renderItem('전자금융거래 이용약관', 'http://www.kcp.co.kr/etc.terms.do')}
          {this.renderItem('개인정보 수집 및 이용 동의', 'http://ridi-terms.s3-website.ap-northeast-2.amazonaws.com/ridi-pay/privacy-policy-collect-and-use')}
          {this.renderItem('개인정보 제공 동의', 'http://ridi-terms.s3-website.ap-northeast-2.amazonaws.com/ridi-pay/privacy-policy-sharing')}
        </ul>
      </ConnectedSceneWrapper>
    );
  }
};

const s = {
  wrapper: css({
    border: `solid 1px ${colors.lightsteelblue_30}`,
    listStyle: 'none',
    margin: '18px',
    padding: 0,
    background: '#fff',
  }),
  item: css({
    height: '47px',
    display: 'flex',
    padding: '0 15px',
    '& + &': {
      borderTop: `solid 1px ${colors.lightsteelblue_30}`
    },
  }),
  itemName: css({
    color: colors.slategray_90,
    fontWeight: 'bold',
    fontSize: '14px',
    flex: 1,
    lineHeight: '46px',
  }),
  itemLink: css({
    color: colors.slategray_40,
    fontSize: '13px',
    lineHeight: '46px',
    textDecoration: 'none',
    '&:hover': {
      color: colors.slategray_50
    }
  }),
  itemArrowIcon: css({
    fill: colors.slategray_40,
    width: '5px',
    height: '8px',
    marginLeft: '4px',
  }),
}