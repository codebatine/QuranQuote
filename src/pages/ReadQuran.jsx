import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

const ReadQuran = () => {
  const [surahs, setSurahs] = useState([]);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (currentSurah) {
        event.preventDefault();
        setCurrentSurah(null);
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [currentSurah]);

  const fetchSurahs = async () => {
    try {
      const response = await axios.get('https://api.alquran.cloud/v1/surah');
      setSurahs(response.data.data);
    } catch (error) {
      console.error('Error fetching surahs', error);
    }
  };

  const fetchAyahs = async (surahNumber) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.ahmedali`);
      setAyahs(response.data.data.ayahs);
      setCurrentSurah(response.data.data);
      window.history.pushState(null, null, `#surah-${surahNumber}`);
    } catch (error) {
      console.error('Error fetching ayahs', error);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      handleSearch(term);
    }
  };

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/search/${term}/all/en.ahmedali`);
      setSearchResults(response.data.data.matches || []);
    } catch (error) {
      console.error('Error searching ayahs', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Read the Quran in English</h1>
      <Search onSearchChange={handleSearchChange} />
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Search Results ({searchResults.length} found)</h2>
          {searchResults.map((result) => (
            <div key={result.number} className="translation-text">
              <p className="ayah-text">
                <strong>{result.surah.number}:{result.numberInSurah}.</strong> {highlightText(result.text, searchTerm)}
              </p>
            </div>
          ))}
        </div>
      ) : currentSurah ? (
        <div className="surah-container">
          <h2 className="surah-title">Surah {currentSurah.englishName} ({currentSurah.name})</h2>
          {ayahs.map((ayah) => (
            <div className="translation-text" key={ayah.number}>
              <p className="ayah-text">
                <strong>{ayah.numberInSurah}.</strong> {ayah.text}
              </p>
            </div>
          ))}
          <button className="action-button" onClick={() => setCurrentSurah(null)}>Back to Surahs</button>
        </div>
      ) : (
        <div className="buttons-container">
          {surahs.map((surah) => (
            <button className="surah-button" key={surah.number} onClick={() => fetchAyahs(surah.number)}>
              {surah.englishName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const highlightText = (text, term) => {
  const parts = text.split(new RegExp(`(${term})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === term.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
      )}
    </span>
  );
};

export default ReadQuran;
