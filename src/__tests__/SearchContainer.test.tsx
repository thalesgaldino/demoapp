import {
  FetchParamType,
  SearchDataType,
  getPhotosSearch,
  getURLWithParams,
} from '../SearchContainer';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

it('should return parameters', () => {
  const searchData: SearchDataType = {
    query: '',
    page: 1,
  };
  const fetchParam: FetchParamType = {
    method: 'flickr.photos.search',
    searchData,
  };
  expect(getURLWithParams(fetchParam)).toBe(
    'https://api.flickr.com/services/rest?api_key=11c40ef31e4961acf4f98c8ff4e945d7&method=flickr.photos.search&text=&page=1&format=json&nojsoncallback=1&per_page=20',
  );
});

it('should call getPhotosSearch which fetches data', async () => {
  const searchData: SearchDataType = {
    query: '',
    page: 1,
  };
  expect(await getPhotosSearch(searchData)).toEqual({});
});

//TODO: this fails because a problem/misconfig with @gluestack-ui lib
// it('Running when empty search results', () => {
//   renderer.create(<SearchContainer />);
// });
