import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export type ItemTileProps = {
  item: {title: string; imageSrc?: string};
  onItemTap: () => void;
};

/**
 * ItemTile Component
 * represents the tile in the search list of the App
 * @param ItemTileProps
 * @returns View of the tile
 */
const ItemTile = ({item, onItemTap}: ItemTileProps) => {
  const {url, title} = item;
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        aspectRatio: 1,
        flex: 0.5,
      }}>
      <TouchableOpacity style={styles.itemWrapper} onPress={onItemTap}>
        <Image
          style={{
            width: "100%",
            aspectRatio: 2,
          }}
          source={{
            uri: url,
          }}
        />
        {/* <Image imageSrc={imageSrc} style={styles.itemImage} /> */}
        <View style={styles.detailWrapper}>
          <Text style={styles.title(isDarkMode)} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
  title: (isDarkMode) => ({
    fontWeight: '700',
    color: isDarkMode ? 'white' : 'black',
  }),
  itemType: {
    marginTop: 8,
  },
});

export default ItemTile;
