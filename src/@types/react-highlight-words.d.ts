// src/@types/react-highlight-words.d.ts

declare module 'react-highlight-words' {
    import { ComponentType } from 'react';
  
    export interface HighlighterProps {
      highlightStyle: {
        backgroundColor: string;
        padding: number;
      };
      searchWords: string[];
      autoEscape?: boolean;
      textToHighlight: string | null | undefined;
    }
  
    const Highlighter: ComponentType<HighlighterProps>;
    export default Highlighter;
  }
  