import { InjectionToken } from "@angular/core";

export interface AppConfig {
  ENDPOINT : string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export const Config: AppConfig = {
  ENDPOINT : 'http://ubuntuserver:3000'
};
