/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Input, InputInput} from '@gluestack-ui/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  itemContainer: {
    aspectRatio: 1,
    flex: 0.5,
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 8,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 2,
  },
  detailWrapper: {
    padding: 8,
    justifyContent: 'space-between',
    height: '50%',
  },
  title: {
    fontWeight: '700',
  },
  itemType: {
    marginTop: 8,
  },

});

type ItemTileProps = {
  item: {title: string; imageSrc?: string};
  onItemTap: () => void;
};

const ItemTile = ({item, onItemTap}: ItemTileProps) => {
  const {imageSrc, title} = item;

  return (
    <View
      style={{
        aspectRatio: 1,
        flex: 0.5,
      }}>
      <TouchableOpacity style={styles.itemWrapper} onPress={onItemTap}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        {/* <Image imageSrc={imageSrc} style={styles.itemImage} /> */}
        <View style={styles.detailWrapper}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [value, setValue] = React.useState('');

  const handleChange = (text: React.SetStateAction<string>) => setValue(text);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        ListHeaderComponent={
          <>
            <Input>
              <InputInput
                placeholder="Search..."
                value={value}
                onChangeText={handleChange}
              />
            </Input>
          </>
        }
        data={DATA}
        renderItem={({item}) => {
          return (
            <ItemTile
              item={{title: item.title}}
              onItemTap={function (): void {
                console.log('tap on the item');
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default App;
