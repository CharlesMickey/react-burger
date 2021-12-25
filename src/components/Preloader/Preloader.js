import React from 'react';
import logoSVG from '../../images/svg/logo.svg';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className='preloader'>
      <div className='preloader__container'>
        <img  className="preloader__round" src={logoSVG} alt='Загрузка...' />
      </div>
    </div>
  );
};

export default Preloader;
