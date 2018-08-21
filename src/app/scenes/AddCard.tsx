import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';
import { CardForm } from 'app/services/cards/components';

export const AddCard: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>카드 등록 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          <CardForm />
        </div>
      </SceneWrapper>
    </>
  );
};
