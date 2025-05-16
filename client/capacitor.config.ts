import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ocil.chatter",
  appName: "chatter",
  webDir: "build",
  server: {
    hostname: "127.0.0.1",
    allowNavigation: ["192.168.66.127:8080/*"],
    androidScheme: "http",
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
