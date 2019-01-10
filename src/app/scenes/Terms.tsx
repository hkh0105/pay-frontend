import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';

export const Terms: React.SFC = () => {
  return (
    <>
      <ConnectedSceneWrapper>
        <Helmet>
          <title>이용 약관 - 리디</title>
        </Helmet>
        <div className={sceneContents}>
          {/* contents */}
        </div>
      </ConnectedSceneWrapper>
    </>
  );
};
