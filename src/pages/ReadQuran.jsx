import { useState, useEffect } from 'react';
import axios from 'axios';

const ReadQuran = () => {
  const [surahs, setSurahs] = useState([]);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    fetchSurahs();
  }, []);

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
    } catch (error) {
      console.error('Error fetching ayahs', error);
    }
  };

  return (
    <div className="container">
      <h1>Read the Quran in English</h1>
      {currentSurah ? (
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

export default ReadQuran;
