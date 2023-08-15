import {API_ENDPOINT, API_KEY} from '../App';
import {
  FetchParamType,
  SearchDataType,
  getPhotosSearch,
  getURLWithParams,
} from '../SearchContainer';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

it('should return parameters', () => {
  const api_key = API_KEY;
  const method = 'flickr.photos.search';
  const searchData: SearchDataType = {
    query: '',
    page: 1,
  };
  const fetchParam: FetchParamType = {
    method,
    searchData,
  };
  expect(getURLWithParams(fetchParam)).toBe(
    `${API_ENDPOINT}?api_key=${api_key}&method=${method}&text=&page=1&format=json&nojsoncallback=1&per_page=20`,
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
