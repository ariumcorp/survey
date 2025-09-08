import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ariumcorp.base.proyect",
  appName: "base-proyect",
  webDir: "build",
  server: {
    androidScheme: "http",
    allowNavigation: [
      "your-couchdb-host.com", // Si tu CouchDB estuviera en la nube
    ],
  },
};

export default config;
