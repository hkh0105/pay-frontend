export interface PlatformDTO {
  isTouchDevice: boolean;
  isPaper: boolean;
  isPaperPro: boolean;
}

export interface EnvironmentState {
  platform: PlatformDTO;
}

export const initialEnvironmentState: EnvironmentState = {
  platform: {
    isTouchDevice: false,
    isPaper: false,
    isPaperPro: false
  }
};
