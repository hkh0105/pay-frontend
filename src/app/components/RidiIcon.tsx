import * as React from 'react';

interface Props {
  className?: string;
}

export const RidiIcon: React.SFC<Props> = (props) => {
  const { className = '' } = props;
  return (
    <svg className={className} version="1.0" width="120px" height="48px" viewBox="0 0 120 48">
      <g>
        <path d="M65.328,48h13.818c7.108,0,12.327-1.807,15.512-5.37c3.213-3.589,4.841-9.858,4.841-18.629
          c0-8.771-1.64-15.039-4.872-18.627C91.416,1.808,86.159,0,79.004,0H65.328c-1.134,0-1.554,0.423-1.554,1.557v44.887
          C63.774,47.578,64.194,48,65.328,48z M76.212,36.691V11.309v-0.552h0.553h1.891c2.993,0,5.159,0.975,6.441,2.895
          c1.226,1.839,1.822,5.224,1.822,10.349c0,5.118-0.57,8.499-1.743,10.334c-1.233,1.93-3.38,2.908-6.379,2.908h-2.032h-0.553V36.691z
          "/>
        <path d="M44.849,48h9.329c1.133,0,1.554-0.423,1.554-1.557V1.558C55.731,0.424,55.31,0,54.177,0h-9.329
          c-1.135,0-1.557,0.423-1.557,1.557v44.886C43.291,47.577,43.713,48,44.849,48z"/>
        <path d="M108.413,48h9.33c1.132,0,1.553-0.423,1.553-1.557V1.558c0-1.134-0.421-1.557-1.553-1.557h-9.33
          c-1.135,0-1.557,0.423-1.557,1.557v44.885C106.856,47.577,107.278,48,108.413,48z"/>
        <path d="M2.259,47.999h9.257c1.135,0,1.557-0.421,1.557-1.555v-12.55v-0.552h0.553h2.554h0.348l0.151,0.312
          l6.176,12.847c0.509,1.019,1.32,1.498,2.55,1.498h9.398c0.791,0,0.913-0.276,0.959-0.38c0.148-0.338,0.074-0.792-0.22-1.348
          l-7.5-14.212l-0.267-0.508l0.517-0.249l0.26-0.124c4.947-2.365,7.455-7.115,7.455-14.122c0-6.312-1.45-10.773-4.309-13.262
          c-2.893-2.516-7.677-3.793-14.22-3.793H2.259c-1.132,0-1.554,0.421-1.554,1.557v44.886C0.704,47.577,1.126,47.999,2.259,47.999z
          M13.073,23.014V11.029v-0.553h0.553h3.712c2.278,0,3.832,0.491,4.75,1.499c0.901,0.984,1.34,2.647,1.34,5.082
          c0,2.285-0.433,3.897-1.325,4.927c-0.907,1.051-2.509,1.583-4.764,1.583h-3.712h-0.553V23.014z"/>
      </g>
    </svg>
  );
};
