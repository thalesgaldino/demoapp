import {API_ENDPOINT, API_KEY} from '../App';
import {
  FetchParamType,
  SearchDataType,
  SearchItem,
  getPhotosSearch,
  getURLWithParams,
  mergeItems,
} from '../SearchContainer';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({test: ''}),
  }),
) as jest.Mock;

beforeEach(() => {
  fetch.mockClear();
});

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

it('returns null when exception', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('API is down'));

  const searchData: SearchDataType = {
    query: '',
    page: 1,
  };
  expect(await getPhotosSearch(searchData)).toBeUndefined();
});

it('merges the search items previous and next', () => {
  const previousSearchResultsItems: SearchItem[] = [
    {
      id: '1',
      title: 'My Cat 1',
      url: 'https://test.com/image1.png',
    },
    {
      id: '2',
      title: 'My Cat 2',
      url: 'https://test.com/image1.png',
    },
  ];

  const newItems: SearchItem[] = [
    {
      id: '3',
      title: 'My Cat 3',
      url: 'https://test.com/image1.png',
    },
    {
      id: '4',
      title: 'My Cat 4',
      url: 'https://test.com/image1.png',
    },
  ];

  expect(
    mergeItems({
      previousSearchResultsItems,
      newItems,
    }),
  ).toEqual([
    {id: '1', title: 'My Cat 1', url: 'https://test.com/image1.png'},
    {id: '2', title: 'My Cat 2', url: 'https://test.com/image1.png'},
    {
      id: '3',
      title: 'My Cat 3',
      url: 'https://farmundefined.staticflickr.com/undefined/3_undefined.jpg',
    },
    {
      id: '4',
      title: 'My Cat 4',
      url: 'https://farmundefined.staticflickr.com/undefined/4_undefined.jpg',
    },
  ]);
});

//TODO: this fails because a problem/misconfig with @gluestack-ui lib
// it('Running when empty search results', () => {
//   renderer.create(<SearchContainer />);
// });
