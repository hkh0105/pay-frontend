import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';

export const ValidatePin: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>결제 비밀번호 입력 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </SceneWrapper>
    </>
  );
};
