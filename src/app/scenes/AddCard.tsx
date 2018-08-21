import * as React from 'react';
import { Helmet } from 'react-helmet';

import { sceneContents, SceneWrapper } from 'app/components';
// import { CreditCardForm } from 'app/services/payment/components';

export const AddCard: React.SFC = () => {
  return (
    <>
      <SceneWrapper>
        <Helmet>
          <title>카드 등록 - 리디페이</title>
        </Helmet>
        <div className={sceneContents}>
          {/* <CreditCardForm /> */}
        </div>
      </SceneWrapper>
    </>
  );
};
