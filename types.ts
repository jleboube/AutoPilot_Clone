export interface Source {
  uri: string;
  title: string;
}

export interface AnalysisResult {
  analysisText: string;
  sources: Source[];
}

export interface TopPick {
  assetName: string;
  ticker: string;
  type: 'Stock' | 'Crypto';
  score: number;
  justification: string;
}
