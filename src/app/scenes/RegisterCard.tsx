import * as React from 'react';
import { Helmet } from 'react-helmet';

import { ConnectedSceneWrapper, sceneContents } from 'app/components';
import { CardForm, ConnectedCardForm } from 'app/services/cards/components';

export const RegisterCard: React.SFC = () => {
  return (
    <>
      <ConnectedSceneWrapper>
        <Helmet>
          <title>카드 등록 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          <ConnectedCardForm />
        </div>
      </ConnectedSceneWrapper>
    </>
  );
};
