I preferred to use React Redux thinking that if it's an application for Marvel, we're going to need a more robust approach.
this application's state management is complex and uou need fine-grained control over state updates and side effects.
If we're building a large-scale application and need a robust solution that scales well.

I understand that is a good option consider context API when your application is relatively simple or has a small to medium size. When you're looking to avoid adding external libraries and keep your bundle size small and this state doesn't require the advanced capabilities provided by Redux.

Here you have an example using Context at this moment of code .

```
import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { generateMD5, now, oneDay } from '../functions/utils';

const CharactersContext = createContext();

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(async () => {
    // Fetch data only if more than one day has passed
    if (lastFetch && now() - lastFetch < oneDay()) {
      return;
    }

    setLoading(true);
    setError(null);

    const limit = 50;
    const timestamp = new Date().getTime();
    const publicKey = `${process.env.REACT_APP_PUBLIC_MARVEL_API_KEY}`;
    const privateKey = `${process.env.REACT_APP_PRIVATE_MARVEL_API_KEY}`;
    const hash = generateMD5(`${timestamp}${privateKey}${publicKey}`);
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await axios.get(apiUrl);
      const results = response.data.data.results;
      setCharacters(results);
      setLastFetch(now());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [lastFetch]);

  const value = {
    characters,
    fetchCharacters,
    loading,
    error,
  };

  return <CharactersContext.Provider value={value}>{children}</CharactersContext.Provider>;
};

```
