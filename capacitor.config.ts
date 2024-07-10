import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myCameraApp',
  webDir: 'www',
  plugins: {
    Camera: {
      webUseInput: true // Jika ingin mengakses kamera di web
    }
  }
};

export default config;
