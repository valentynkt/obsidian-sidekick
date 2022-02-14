import { findAll } from 'highlight-words-core';
import { Indexer } from '../indexing/indexer';

type SearchResult = {
  start: number;
  end: number;
  matchingWord: string;
};

export default class Search {
  constructor(private indexer: Indexer) {}

  public getSuggestionReplacement(text: string): string {
    return this.indexer.index.find((index) => index.index === text.toLowerCase()).displayText;
  }

  public find(text: string): SearchResult[] {
    const searchWords = this.indexer.index.map((index) => {
      try {
        return index.index;
      } catch (err) {
        console.error('Cannot return text value of index', index, err);
      }
    });

    // Strip out hashtags and links as we don't need to bother searching them
    const textToHighlight = text
      .replace(/#+([a-zA-Z0-9_]+)/g, (m) => ' '.repeat(m.length)) // remove hashtags
      .replace(/\[(.*?)\]+/g, (m) => ' '.repeat(m.length)); // remove links

    return findAll({ searchWords, textToHighlight })
      .filter((chunk) => chunk.highlight)
      .map((chunk) => ({
        ...chunk,
        matchingWord: textToHighlight.substring(chunk.start, chunk.end),
      }));
  }
}
