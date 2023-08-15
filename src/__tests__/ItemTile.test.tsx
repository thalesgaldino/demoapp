import 'react-native';
import React from 'react';
import ItemTile from '../ItemTile';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Should render the item tile', () => {
  renderer.create(
    <ItemTile
      item={{
        title: '',
        imageSrc: undefined,
      }}
      onItemTap={function (): void {
        throw new Error('Function not implemented.');
      }}
    />,
  );
});
