export interface WebSetting {
  _id: string;
  platformName: string;
  tagline: string;
  description: string;
  platformLogo: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  supportEmail: string;
  websiteURL: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebSettingResponse {
  success: boolean;
  message: string;
  data: WebSetting;
  meta: null;
}

export interface WebSettingPayload {
  platformName: string;
  tagline: string;
  description: string;
  platformLogo: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  supportEmail: string;
  websiteURL: string;
}
