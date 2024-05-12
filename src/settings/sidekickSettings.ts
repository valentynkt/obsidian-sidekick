export interface SidekickSettings{
  enableStemming: boolean;
  matchTags: boolean;
  matchUnresolved: boolean;
  keywordsFilter: string;
}

export const DEFAULT_SETTINGS: SidekickSettings = {
  enableStemming: false,
  matchTags: false,
  matchUnresolved: true,
  keywordsFilter: ""
}
