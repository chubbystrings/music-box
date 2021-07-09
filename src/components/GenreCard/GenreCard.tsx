import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import cardStyles from './GenreCard.module.css';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import Loader from 'react-loader-spinner';

interface Genre {
  id: number;
  name: string;
  picture_medium: string;
  _id: string;
}

const GenreCard = () => {
  const history = useHistory();
  const selectGenre = (genreId: number, playlistId: string) => {
    history.push(`/genres/${genreId}/${playlistId}`);
  };

  const [genres, setGenres] = useState([{}] as Genre[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres`);
      setGenres(data);
      setIsLoading(false);
    };

    try {
      fetchGenres();
    } catch (e) {
      setIsLoading(false);
      setError(e.response);
    }
  }, []);

  return (
    <div>
      {error && <h1>An error occurred, pls try again...</h1>}
      {isLoading && !error && (
        <div className={cardStyles.genreLoader}>
          <Loader type='Oval' color='#FFFFFF' height={50} width={50} />
        </div>
      )}
      {genres && genres.length !== 0 && !isLoading && (
        <motion.div initial='out' animate='in' variants={pageTransition} transition={transit}>
          <h2 className={cardStyles.genreHeader}>Genres</h2>
          <div className={cardStyles.genreGrid}>
            {genres.map((genre) => {
              return (
                <motion.div initial='out' animate='in' variants={pageTransition} transition={transit}>
                  <div key={genre.id} onClick={() => selectGenre(genre.id, genre._id)}>
                    <div
                      className={cardStyles.genreCard}
                      style={{
                        background: `rgba(255, 255, 255, .1) url(${genre.picture_medium})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <div className={cardStyles.overlay}></div>
                      <div className={cardStyles.genreName}>{genre.name}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GenreCard;
