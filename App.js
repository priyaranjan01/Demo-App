import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Routes from './src/Routes';
import {FavouriteDataProvider} from './src/context/useFavouriteList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FavouriteDataProvider>
        <Routes />
      </FavouriteDataProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
