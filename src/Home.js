import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useFavouriteList from './context/useFavouriteList';

const Home = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState({
    current_limit: 5,
    last_limit: 20,
  });

  const username = 'John';

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerBackVisible: false,
      headerTitleAlign: 'left',
      headerRight: () => (
        <TabButton
          source={require('../assets/images/empty-heart.png')}
          onPress={() => navigation.navigate('Favourite')}
        />
      ),
    });
    fetchData();
  }, [pagination]);

  const fetchData = async () => {
    try {
      const resp = await fetch(
        `https://fakestoreapi.com/products?limit=${pagination.current_limit}`,
      );

      const json = await resp.json();
      setData(json);
      console.log('Data=', JSON.stringify(json));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Header = () => {
    return (
      <View>
        <Text style={styles.headerTitle}>Hello {username}!</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.flatlist}
      nestedScrollEnabled={true}
      data={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index}) => <Card item={item} />}
      ListFooterComponent={() => (
        <View style={styles.flatlistFooter}>
          {pagination.current_limit < pagination.last_limit && (
            <ActivityIndicator size={'small'} />
          )}
        </View>
      )}
      onEndReached={() =>
        setPagination({
          ...pagination,
          current_limit:
            pagination.current_limit < pagination.last_limit
              ? pagination.current_limit + 5
              : pagination.last_limit,
        })
      }
    />
  );
};

export default Home;

export const Card = ({item}) => {
  const {favouriteList, setFavouriteList} = useFavouriteList();

  const handleFavouriteProduct = product => {
    //
    let existing = favouriteList.findIndex(c => c?.id === product.id);
    if (existing >= 0) {
      let tempArray = [...favouriteList];
      tempArray = tempArray.filter(t => t.id !== product.id);
      setFavouriteList(tempArray);
    } else {
      setFavouriteList([...favouriteList, product]);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          source={{uri: item?.image}}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.cardFlexBox}>
        <View style={styles.boxTitleStyle}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.cardTitleStyle}>
            {item?.title}
          </Text>
          <TouchableOpacity onPress={() => handleFavouriteProduct(item)}>
            <Image
              source={
                favouriteList.findIndex(c => c?.id === item.id) >= 0
                  ? require('../assets/images/filled-heart.png')
                  : require('../assets/images/empty-heart.png')
              }
              style={
                favouriteList.findIndex(c => c?.id === item.id) >= 0
                  ? styles.filledHeartStyle
                  : styles.emptyHeartStyle
              }
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.desStyle}>{item?.description}</Text>
        <Text style={styles.priceStyle}>€{item?.price}</Text>
      </View>
    </View>
  );
};

const TabButton = ({onPress, source, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={[styles.tabImage, style]} />
    </TouchableOpacity>
  );
};

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
  emptyHeartStyle: {height: 25, width: 25, marginLeft: 5, tintColor: '#333'},
  filledHeartStyle: {height: 25, width: 25, marginLeft: 5, tintColor: 'red'},
  boxTitleStyle: {flex: 1, flexDirection: 'row'},
  tabImage: {
    marginHorizontal: 10,
    height: 25,
    width: 25,
  },
});
