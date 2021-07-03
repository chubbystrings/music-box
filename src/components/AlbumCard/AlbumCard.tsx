import React from 'react';
import { useHistory } from 'react-router-dom';
import albumCard from './AlbumCard.styles';

type Props = {
  album: any;
  artistName: string;
};

const AlbumCard: React.FC<Props> = ({ album, artistName }) => {
  const history = useHistory();
  const classes = albumCard();
  const handleClick = () => {
    history.push(`/album/${album.id}`);
    window.location.reload();
  };
  return (
    <div onClick={handleClick} className={classes.albumCard}>
      <div className={classes.albumImgBox}>
        <img className={classes.albumImg} src={album.cover_medium} alt='album pic' />
      </div>
      {/* <h4 className={classes.albumTitle}>{artistName}</h4> */}
      <h4 className={classes.albumDate}>Released: {album.release_date}</h4>
    </div>
  );
};

export default AlbumCard;
