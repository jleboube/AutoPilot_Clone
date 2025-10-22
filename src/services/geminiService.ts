import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { AnalysisResult, Source, TopPick } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Please provide a valid key for the app to function.");
}

// Per guideline, use process.env.API_KEY directly, assuming it's configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getMarketAnalysis = async (query: string): Promise<AnalysisResult> => {
    try {
        const prompt = `
        Provide a detailed investment analysis for "${query}". The user is looking for actionable insights similar to a professional financial analyst's report. Structure your response into the following sections:

        ### Overview & Ticker
        Start with a brief, compelling summary of the asset and its primary ticker symbol.

        ### Recent Performance
        Analyze its performance over the last quarter and year, mentioning key price movements and milestones.
        
        ### Core Strengths (Bull Case)
        List 2-3 key strengths or positive catalysts that support an investment.
        
        ### Potential Risks (Bear Case)
        List 2-3 significant risks or headwinds that could negatively impact the asset's value.
        
        ### AI-Powered Recommendation
        Conclude with a clear recommendation: 'Strong Buy', 'Buy', 'Hold', 'Sell', or 'Strong Sell', along with a concise justification based on the analysis above.
        
        Base your entire analysis on the most recent, publicly available data from reliable financial sources.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const analysisText = response.text;
        
        const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources: Source[] = rawSources
          .filter((chunk: any) => chunk.web && chunk.web.uri && chunk.web.title)
          .map((chunk: any) => ({
            uri: chunk.web.uri,
            title: chunk.web.title,
          }))
          // Remove duplicate URIs
          .filter((source: Source, index: number, self: Source[]) => 
            index === self.findIndex((s: Source) => s.uri === source.uri)
          );

        return { analysisText, sources };

    } catch (error) {
        console.error("Error fetching market analysis:", error);
        throw new Error("Failed to get analysis from Gemini API. Please check your API key and network connection.");
    }
};

export const getTopPicks = async (): Promise<TopPick[]> => {
    try {
        const prompt = `
        Act as an expert financial analyst and portfolio manager. Your task is to scan the entire US stock market and global cryptocurrency market to identify the top 3-5 investment opportunities with the highest potential for growth in the next 6-12 months.

        For each identified asset, provide a score from 1 to 10, where 10 represents a 'must-buy' conviction.
        
        **Constraint**: Only return assets with a score of 8 or higher. If no assets meet this stringent criteria, you MUST return an empty array.

        Your analysis must be based on fundamental strength, recent positive catalysts, market sentiment, and technical analysis indicators.
        Present your findings in the specified JSON format.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            assetName: { type: Type.STRING, description: "Full name of the asset." },
                            ticker: { type: Type.STRING, description: "The ticker symbol (e.g., AAPL, BTC)." },
                            type: { type: Type.STRING, enum: ['Stock', 'Crypto'], description: "The type of the asset." },
                            score: { type: Type.INTEGER, description: "AI conviction score from 1-10." },
                            justification: { type: Type.STRING, description: "Brief reason for the high score." },
                        },
                        required: ['assetName', 'ticker', 'type', 'score', 'justification'],
                    },
                },
            },
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
            return [];
        }
        
        const picks = JSON.parse(jsonText);
        return picks as TopPick[];

    } catch (error) {
        console.error("Error fetching top picks:", error);
        throw new Error("Failed to get top picks from Gemini API. The model may be unable to generate a valid response at this time.");
    }
};