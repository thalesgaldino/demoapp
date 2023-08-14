import 'react-native';
import React from 'react';
import EmptyResults from '../EmptyResults';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Running when empty search results', () => {
  renderer.create(
    <EmptyResults
      searchResults={undefined}
      searchHistory={undefined}
      isLoading={false}
    />,
  );
});
