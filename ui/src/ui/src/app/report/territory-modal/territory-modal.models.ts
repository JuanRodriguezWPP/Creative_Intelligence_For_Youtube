import { AdaptationType } from '../report.models';

export type AdaptationOpportunityFilter = 'all' | number;

export interface TerritoryOpportunityViewModel {
  index: number;
  numberLabel: string;
  title: string;
  finding: string;
  evidence: string;
  evidenceObj?: {
    descripcion: string;
    timestamp_s: number;
    tags: string[];
  };
  insight: string;
  opportunity: string;
  suggestedFormat: string;
  intervention?: 'personalize' | 'amplify';
  adaptationCount: number;
  relevanceLabel: string;
}

export interface TerritoryAdaptationCardViewModel {
  id: string;
  sourceOpportunityIndex: number;
  sourceOpportunityLabel: string;
  classification: AdaptationType;
  intervention?: 'personalize' | 'amplify';
  title: string;
  description: string;
  suggestedFormat: string;
  tags: string[];
  idealFor: string[];
  previewUrl: string | null;
  timestamp_s?: number;
}

export interface TerritoryModalViewModel {
  opportunities: TerritoryOpportunityViewModel[];
  adaptations: TerritoryAdaptationCardViewModel[];
}
