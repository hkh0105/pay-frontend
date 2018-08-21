import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';

/** 결제페이지 디자인 추가 필요(결제 진행 중 화면) */
export const Payment: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>결제 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </SceneWrapper>
    </>
  );
};
