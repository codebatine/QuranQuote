import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
  padding-top: 80px;
`;

const SurahContainer = styled.div`
  margin: 1rem 0;
`;

const SurahTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const AyahText = styled.p`
  margin: 0.5rem 0;
`;

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
    <Container>
      <h1>Read the Quran in English</h1>
      {currentSurah ? (
        <SurahContainer>
          <SurahTitle>Surah {currentSurah.englishName} ({currentSurah.name})</SurahTitle>
          {ayahs.map((ayah) => (
            <AyahText key={ayah.number}>
              <strong>{ayah.numberInSurah}.</strong> {ayah.text}
            </AyahText>
          ))}
          <button onClick={() => setCurrentSurah(null)}>Back to Surahs</button>
        </SurahContainer>
      ) : (
        <div>
          {surahs.map((surah) => (
            <button key={surah.number} onClick={() => fetchAyahs(surah.number)}>
              {surah.englishName}
            </button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ReadQuran;
