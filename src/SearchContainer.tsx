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
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {Spinner} from '@gluestack-ui/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import EmptyResults from './EmptyResults';
import ItemTile from './ItemTile';
import {API_ENDPOINT, API_KEY} from './App';
import SearchHeader from './SearchHeader';

//types
export type SearchItem = {
  url: string;
  title: string;
  id: string;
};

export type SearchResults = {
  items: SearchItem[];
  total: number;
  pages: number;
};

export type SearchDataType = {
  query: string;
  page: number;
};

export type FetchParamType = {
  method: string;
  searchData: SearchDataType;
};

/**
 *
 * @param fetchParam Function to build the url parameters
 * @returns
 */
export const getURLWithParams = (fetchParam: FetchParamType) => {
  const {searchData, method} = fetchParam;
  let params = new URLSearchParams();
  params.append('api_key', API_KEY);
  params.append('method', method);
  params.append('text', searchData.query);
  params.append('page', `${searchData.page}`);
  params.append('format', 'json');
  params.append('nojsoncallback', '1');
  params.append('per_page', '20');
  return `${API_ENDPOINT}?${params}`;
};

/**
 * getPhotosSearch
 * return a promisse after getting the json from goFetch
 * @param searchData: SearchDataType
 * @returns promisse with SearchResults
 */
export const getPhotosSearch = async (searchData: SearchDataType) => {
  try {
    const resJson = await fetch(
      getURLWithParams({
        method: 'flickr.photos.search',
        searchData,
      }),
    );
    const data = await resJson.json();
    if (data.photos)
      return {
        items: data.photos.photo,
        total: data.photos.total,
        pages: data.photos.pages,
      };
    if (data?.stat === 'fail') {
      // TODO: implement UX
      // console.warn('api call failure');
    }
    return {};
  } catch (e) {
    return undefined;
  }
};

export type MergeItemsFunctionParam = {
  previousSearchResultsItems: SearchItem[] | undefined;
  newItems: SearchItem[];
};

/**
 * This function is to ammend the list with next results items
 * @param param0 object with previous SearchResults Items and new Items
 * @returns
 */
export const mergeItems = ({
  previousSearchResultsItems,
  newItems,
}: MergeItemsFunctionParam) => {
  const itemsWithUrl: SearchItem[] = newItems.map((photo: SearchItem) => ({
    ...photo,
    url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
  }));
  return previousSearchResultsItems
    ? [...previousSearchResultsItems, ...itemsWithUrl]
    : itemsWithUrl;
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

  const processResults =
    (previousSearchResultsItems: SearchItem[] | undefined) =>
    ({items, total, pages}: SearchResults) => {
      if (items && items.length) {
        const newSearchResultsItems = mergeItems({
          newItems: items,
          previousSearchResultsItems,
        });
        setSearchResults({items: newSearchResultsItems, total, pages});
      }
      setIsLoading(false);
    };

  const searchInit = (searchData: SearchDataType) => {
    getPhotosSearch(searchData).then(processResults(searchResults?.items));
  };

  useEffect(() => {
    searchInit(searchData);
  }, [searchData]);

  const onEndReached = () => {
    const isLastPage = searchResults?.pages === searchData.page;
    const noResults = searchResults?.total === 0;
    if (
      searchData &&
      searchData.page >= 1 &&
      !isLoading &&
      !isLastPage &&
      !noResults
    ) {
      const nextPageIndex = searchData.page + 1;
      setIsLoading(true);
      setSearchData({...searchData, page: nextPageIndex});
    }
  };

  const onHistoryPressed = () => {
    setSearchResults({items: [], total: 0});
    setSearchData({query: '', page: 1});
  };

  return (
    <SafeAreaView style={{...backgroundStyle, flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        ListHeaderComponent={
          <SearchHeader
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
            setSearchData={setSearchData}
            setIsLoading={setIsLoading}
            onHistoryPressed={onHistoryPressed}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexGrow: 1,
        }}
        numColumns={2}
        data={searchResults?.items}
        renderItem={({item}: {item: any}) => {
          return <ItemTile item={{title: item.title, url: item.url}} />;
        }}
        onEndReached={onEndReached}
        keyExtractor={item => item.id}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.wrapper}>
              <Spinner accessibilityLabel="Loading items" />
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

const styles = StyleSheet.create({
  textColor: isDarkMode => ({color: isDarkMode ? 'white' : 'black'}),
  textFormat: {fontSize: 18},
  wrapper: {marginVertical: 16},
});

export default SearchContainer;
