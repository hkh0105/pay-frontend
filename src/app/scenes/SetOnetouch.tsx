import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';

export const SetOnetouch: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>원터치 결제 설정 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </SceneWrapper>
    </>
  );
};
