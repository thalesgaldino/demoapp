import React from 'react';
import {View, Text, useColorScheme, StyleSheet} from 'react-native';
import {VStack, Divider} from '@gluestack-ui/react';

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
        <View style={styles.wrapper}>
            <Text style={styles.textColor(isDarkMode)}>
                {'No items returned. Please enter new query.'}
            </Text>
        </View>
        {searchHistory && searchHistory.length > 0 ? (
          <View>
            <View style={styles.wrapper}>
            <Text style={styles.textColor(isDarkMode)}>{`Search history:`}</Text>
            </View>
            <VStack w={'100%'} justifyContent="center" alignItems="center">
              <DividerWrap />
              {searchHistory.map((item:string, index) => {
                return (<View key={`item_${index}`}>
                                <View style={styles.wrapper}>
                                    <Text onPress={() => console.warn(`to redirect to ${item}`)}>{item}</Text>
                                    <DividerWrap />{/*somehow a key in the immediate parent of this makes it hidden*/}
                                </View>
                            </View>);
              })}
            </VStack>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <Text style={styles.textColor(isDarkMode)}>{`No search history.`}</Text>
          </View>
        )}
      </View>
    );
  }
};

const DividerWrap = () => (<Divider
                style={{marginTop: 16}}
                w={'100%'}
                variant="horizontal"
                
            />);

const styles = StyleSheet.create({
    textColor: (isDarkMode) =>  ({color: isDarkMode ? 'white' : 'black'}),
    wrapper: {marginTop: 16, marginHorizontal: 16}
});

export default EmptyResults;
