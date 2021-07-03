import React, { useState, useRef, useEffect, useContext } from 'react';
import classes from './Dropdown.module.css';
import { SortContext } from '../../context/SortContext';

interface Props {}

const Dropdown: React.FunctionComponent = (props: Props) => {
  const ctx = useContext(SortContext);
  const [dropdownState, setDropdownState] = useState(false);
  const [currentState, setCurrentState] = useState('updatedAt');
  const container = useRef<HTMLDivElement>(null);

  const onClickHandler = () => {
    setDropdownState((prev) => !prev);
  };

  const handleClick = (e: { target: any }) => {
    if (container.current?.contains(e.target)) {
      // inside click
      return;
    }
    setDropdownState(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={classes.container} ref={container}>
      <h3 onClick={onClickHandler} className={classes.button}>
        ...
      </h3>
      {dropdownState && (
        <div className={classes.dropdown}>
          <ul>
            <li
              className={currentState === 'updatedAt' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('updatedAt');
                return ctx.onSortHandler('updatedAt');
              }}
            >
              Date Added
            </li>
            <li
              className={currentState === 'name' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('name');
                return ctx.onSortHandler('name');
              }}
            >
              A - Z
            </li>
            <li
              className={currentState === 'songs' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('songs');
                return ctx.onSortHandler('songs');
              }}
            >
              Number of Songs
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
