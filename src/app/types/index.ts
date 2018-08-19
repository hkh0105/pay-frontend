export type ObjectKey = string | number | symbol;

export type Diff<T extends ObjectKey, U extends ObjectKey> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];

export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type DateDTO = string; // ISO8601: 2016-10-27T17:13:40+00:00 || 2016-10-27T17:13:40Z || 20161027T171340Z
