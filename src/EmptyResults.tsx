import React from 'react';
import {View, Text, useColorScheme} from 'react-native';

type EmptyResultsProps = {
  searchResults: any;
  searchHistory: any;
  isLoading: boolean;
};

/**
 * EmptyResults Component
 * Component that shows the view in case searchResults are empty
 * @param props: EmptyResultsProps
 * @returns View
 */
const EmptyResults = (props: EmptyResultsProps) => {
  const {searchResults, searchHistory, isLoading} = props;
  const isDarkMode = useColorScheme() === 'dark';

  if (isLoading) {
    return null;
  }

  if (searchResults === undefined || searchResults?.items?.length === 0) {
    return (
      <View>
        <Text style={{color: isDarkMode ? 'white' : 'black', margin: 16}}>
          {'No items returned, please enter new query'}
        </Text>
        {searchHistory && searchHistory.length > 0 ? (
          <View>
            <Text
              style={{
                color: isDarkMode ? 'white' : 'black',
                margin: 16,
              }}>{`search history: ${searchHistory.length}`}</Text>
            <>
              {searchHistory.map((item:string) => {
                return <Text>{item}</Text>;
              })}
            </>
          </View>
        ) : (
          <View>
            <Text
              style={{
                color: isDarkMode ? 'white' : 'black',
                margin: 16,
              }}>{`No search history`}</Text>
          </View>
        )}
      </View>
    );
  }
};

export default EmptyResults;
