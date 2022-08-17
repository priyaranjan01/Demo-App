import {FlatList, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import useFavouriteList from './context/useFavouriteList';
import {Card} from './Home';

const Favourite = ({navigation, route}) => {
  const {favouriteList} = useFavouriteList();

  return (
    <FlatList
      style={styles.flatlist}
      nestedScrollEnabled={true}
      data={favouriteList}
      ListEmptyComponent={() => (
        <View style={styles.emptyComponent}>
          <Text>No Data Found!</Text>
        </View>
      )}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => <Card item={item} />}
      ListFooterComponent={() => <View style={styles.flatlistFooter} />}
    />
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  headerSubTitle: {
    color: '#888',
    fontSize: 14,
  },
  flatlist: {padding: 20},
  flatlistFooter: {height: 50, alignItems: 'center'},
  cardContainer: {
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.2,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  imgStyle: {height: 100, width: 100, borderRadius: 5, marginRight: 10},
  cardFlexBox: {flex: 1},
  cardTitleStyle: {fontSize: 18, fontWeight: 'bold', color: '#222', flex: 1},
  desStyle: {color: '#888', fontSize: 14, marginVertical: 5},
  priceStyle: {color: 'green', fontSize: 14, fontWeight: 'bold'},
  keywordContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  keywordBox: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#efefef',
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  keywordText: {fontSize: 14, color: '#222'},
  heartStyle: {height: 25, width: 25, marginLeft: 5},
  boxTitleStyle: {flex: 1, flexDirection: 'row'},
  tabImage: {
    marginHorizontal: 10,
    height: 25,
    width: 25,
  },
  emptyComponent: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
