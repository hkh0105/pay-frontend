import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';

export const Terms: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>이용 약관 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </SceneWrapper>
    </>
  );
};
