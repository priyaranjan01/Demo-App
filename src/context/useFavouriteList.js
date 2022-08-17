import React, {useContext, useState} from 'react';

const FavouriteContext = React.createContext();

export const FavouriteDataProvider = ({children}) => {
  const [favouriteList, setFavouriteList] = useState([]);
  return (
    <FavouriteContext.Provider value={{favouriteList, setFavouriteList}}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default () => useContext(FavouriteContext);
