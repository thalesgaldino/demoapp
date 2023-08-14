/**
 * Image search Container
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Input, InputInput} from '@gluestack-ui/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import EmptyResults from './EmptyResults';
import ItemTile from './ItemTile';

// const API_KEY = '<ADD-KEY_HERE>';
const API_KEY = '11c40ef31e4961acf4f98c8ff4e945d7';

// types

type SearchItem = {
  url: string;
  title: string;
  id: string;
};

type SearchResults = {
  items: SearchItem[];
  total: number;
  pages: number;
};

type SearchDataType = {
  query: string;
  page: number;
};

type FetchParamType = {
  method: string;
  searchData: SearchDataType;
};

/**
 * goFetch
 * This function fetches the flickr url according to its chosen method
 *
 * @param fetchParam: FetchParamType
 * @returns Promise with object wrapping search results json
 */
const goFetch = (fetchParam: FetchParamType) => {
  const {searchData, method} = fetchParam;
  let params = new URLSearchParams();
  params.append('api_key', API_KEY);
  params.append('method', method);
  params.append('text', searchData.query);
  params.append('page', `${searchData.page}`);
  params.append('format', 'json');
  params.append('nojsoncallback', '1');
  params.append('per_page', '20');
  return fetch('https://api.flickr.com/services/rest?' + params);
};

/**
 * getPhotosSearch
 * return a promisse after getting the json from goFetch
 * @param searchData: SearchDataType
 * @returns promisse with SearchResults
 */
const getPhotosSearch = (searchData: SearchDataType) => {
  return goFetch({
    method: 'flickr.photos.search',
    searchData,
  })
    .then(r => {
      return r.json();
    })
    .then(res => {
      console.log('this is the result: ', res);
      return {
        items: res.photos?.photo,
        total: res.photos?.total,
        pages: res.photos?.pages,
      };
    })
    .catch(error => console.log('error: ', error));
};

/**
 * This component shows a search view with search results
 * @returns Search Container View
 */
const SearchContainer = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchData, setSearchData] = useState<SearchDataType>({
    query: '',
    page: 1,
  });
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addUrlToResults = ({items, total, pages}: SearchResults) => {
    let itemsWithUrl: SearchItem[] = [];
    if (items && items.length) {
      itemsWithUrl = items.map((photo: SearchItem) => ({
        ...photo,
        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      }));
      // console.warn(
      //   'these are the old items searchResults.items: ',
      //   searchResults?.items,
      // );
      // console.warn('these are the itemsWithUrl: ', itemsWithUrl);
      // debugger;
      const newSearchResultsItems = searchResults
        ? [...searchResults.items, ...itemsWithUrl]
        : itemsWithUrl;
      setSearchResults({items: newSearchResultsItems, total, pages});
    }
    setIsLoading(false);
  };

  const searchInit = (searchData: SearchDataType) => {
    console.log('starting search for: ', searchData.query);
    getPhotosSearch(searchData).then(addUrlToResults);
  };

  useEffect(() => {
    console.log('running effect2 for page: ', searchData.page);
    searchInit(searchData);
  }, [searchData]);

  // console.log('this is the searchResults?.items: ', searchResults?.items);
  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        ListHeaderComponent={
          <View style={{margin: 8}}>
            <Input>
              <InputInput
                placeholder="Search..."
                placeholderTextColor={'grey'}
                color={isDarkMode ? 'white' : 'black'}
                returnKeyType={'search'}
                onSubmitEditing={param => {
                  // console.warn('onSubmitEditing called param: ', param.nativeEvent.text);
                  const {text} = param?.nativeEvent;
                  //reset results so there's no risk of "cache" - temporary solution
                  setSearchResults({items: [], total: 0});
                  if (text !== '') {
                    setSearchHistory([...searchHistory, text]);
                    setSearchData({query: text, page: 1});
                    setIsLoading(true);
                  }
                }}
              />
            </Input>
            {searchResults?.total >= 0 && (
              <Text
                style={{
                  color: isDarkMode ? 'white' : 'black',
                  marginVertical: 16,
                }}>{`Total: ${searchResults?.total}`}</Text>
            )}
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexGrow: 1,
        }}
        numColumns={2}
        data={searchResults?.items}
        renderItem={({item}: {item: any}) => {
          return (
            <ItemTile
              item={{title: item.title, url: item.url}}
              onItemTap={function (): void {
                console.log('tap on the item');
              }}
            />
          );
        }}
        onEndReached={() => {
          console.log('onEndReached called! searchData: ', searchData);
          //TODO: to test
          const isLastPage = searchResults?.pages === searchData.page;
          if (searchData && searchData.page >= 1 && !isLoading && !isLastPage) {
            const nextPageIndex = searchData.page + 1;
            setIsLoading(true);
            setSearchData({...searchData, page: nextPageIndex});
          }
        }}
        keyExtractor={item => item.id}
        ListFooterComponent={
          isLoading ? (
            <View>
              <Text style={{color: isDarkMode ? 'white' : 'black'}}>
                {'Loading...'}
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <EmptyResults
            searchData={searchData}
            searchResults={searchResults}
            searchHistory={searchHistory}
            isLoading={isLoading}
          />
        }
      />
    </SafeAreaView>
  );
};

export default SearchContainer;