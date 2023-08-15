import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Input, InputInput, Button, ButtonText} from '@gluestack-ui/react';
import {SearchDataType, SearchResults} from './SearchContainer';

type HeaderPropsType = {
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResults | undefined>
  >;
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchData: React.Dispatch<React.SetStateAction<SearchDataType>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResults | undefined;
  onHistoryPressed: () => void;
};

const SearchHeader = (props: HeaderPropsType) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    setSearchResults,
    searchHistory,
    setSearchHistory,
    setSearchData,
    setIsLoading,
    searchResults,
    onHistoryPressed,
  } = props;
  return (
    <View style={{margin: 8}}>
      <Input>
        <InputInput
          placeholder="Search..."
          placeholderTextColor={'grey'}
          color={isDarkMode ? 'white' : 'black'}
          returnKeyType={'search'}
          onSubmitEditing={param => {
            const {text} = param?.nativeEvent;
            // reseting results so there's no risk of "cache" - temporary solution
            setSearchResults({items: [], total: 0});
            if (text !== '') {
              if (searchHistory.some(element => element === text)) {
                console.log('already added to history!');
              } else {
                setSearchHistory([...searchHistory, text]);
              }
              setSearchData({query: text, page: 1});
              setIsLoading(true);
            }
          }}
        />
      </Input>
      {searchResults?.total >= 0 && (
        <View
          style={[
            styles.wrapper,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <Text
            style={[
              styles.textColor(isDarkMode),
              styles.textFormat,
            ]}>{`Total: ${searchResults?.total}`}</Text>
          <Button
            size="sm"
            variant="solid"
            action="primary"
            isDisabled={searchHistory.length === 0}
            onPress={onHistoryPressed}
            isFocusVisible={false}>
            <ButtonText>History</ButtonText>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: isDarkMode => ({color: isDarkMode ? 'white' : 'black'}),
  textFormat: {fontSize: 18},
  wrapper: {marginVertical: 16},
});

export default SearchHeader;
