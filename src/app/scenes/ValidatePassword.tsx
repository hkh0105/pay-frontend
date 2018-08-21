import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';

export const ValidatePassword: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>리디북스 비밀번호 입력 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </SceneWrapper>
    </>
  );
};
