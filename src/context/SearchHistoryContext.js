import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_HISTORY = 8;

const SearchHistoryContext = createContext(null);

export function SearchHistoryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setHistory(JSON.parse(raw));
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  async function addSearch(username) {
    const next = [username, ...history.filter((u) => u.toLowerCase() !== username.toLowerCase())]
      .slice(0, MAX_HISTORY);
    setHistory(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async function clearHistory() {
    setHistory([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <SearchHistoryContext.Provider value={{ history, loaded, addSearch, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const ctx = useContext(SearchHistoryContext);
  if (!ctx) throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  return ctx;
}
