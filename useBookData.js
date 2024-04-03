import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://dev.iqrakitab.net/api/books';

const useBookData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const responseData = response.data && response.data.data;
        setBooks(responseData || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, books };
};

export default useBookData;
