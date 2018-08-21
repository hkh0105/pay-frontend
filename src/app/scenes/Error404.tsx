import { css } from 'emotion';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '@ridi/rsg/components/dist/button';

export const Error404: React.SFC = () => {
  return (
    <main className="SceneWrapper">
      <Helmet>
        <title>404 Not Found - 리디셀렉트</title>
      </Helmet>
      <div className="ErrorPage">
        <h2 className="ErrorPage_Title">404 Not Found</h2>
        <p className="ErrorPage_Description">
          <strong>요청하신 페이지가 없습니다.</strong>
          <br />
          입력하신 주소를 확인해주세요.
        </p>
        <ul className="ErrorPage_ButtonList">
          <li className="ErrorPage_ButtonList_Item">
            <Button
              className="ErrorPage_Button"
              color="gray"
              size="large"
              outline={true}
              onClick={() => window.history.back()}
            >
              이전 페이지
            </Button>
          </li>
          <li className="ErrorPage_ButtonList_Item">
            <Button
              className="ErrorPage_Button"
              color="blue"
              size="large"
              wrapperElement="a"
              wrapperProps={{ href: '/home' }}
            >
              홈으로 돌아가기
            </Button>
          </li>
        </ul>
      </div>
    </main>
  );
};
