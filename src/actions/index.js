import { jambaseApiKey } from '../cleaners/apiKey';
import { cleanConcertData } from '../cleaners/cleanConcertData';
import { fetchImage } from '../cleaners/fetchImage';
import { filterDates } from '../cleaners/filterDates';

import { mockFetchData } from '../cleaners/mockFetchData';


export const loadTonightsShows = (shows) => ({
  type: "LOAD_TONIGHTS_SHOWS",
  shows
});

export const loadThisWeeksShows = (shows) => ({
  type: "LOAD_THIS_WEEKS_SHOWS",
  shows
});

export const loadUpcomingShows = (shows) => ({
  type: "LOAD_UPCOMING_SHOWS",
  shows
});

export const showIsLoading = (bool) => ({
  type: 'SHOW_IS_LOADING',
  showIsLoading: bool
});

export const showHasErrored = (bool) => ({
  type: 'SHOW_HAS_ERRORED',
  showHasErrored: bool
});


export const fetchShows = (zipCode) => {
  try {
    return async (dispatch) => {
      dispatch(showIsLoading(true));

      // const rootUrl = 'http://api.jambase.com/events?'
      // const api = `&page=all&api_key=${jambaseApiKey}`;
      // const response = await fetch(`${rootUrl}zipCode=${zipCode}${api}`);
      
      // if( !response.ok ) {
      //   dispatch(showHasErrored(true))
      //   // console.log('you fucked up')
      //   // throw Error(response.statusText);
      // }
      
      const concertData = mockFetchData
      // const concertData = await response.json()
      // console.log(concertData.Events)
      const cleanData = cleanConcertData(concertData.Events);
      const dataWithImage = await fetchImage(cleanData);
      const dates = filterDates(dataWithImage);
      
      dispatch(showIsLoading(false));
      dispatch(loadTonightsShows(dates[0]));
      dispatch(loadThisWeeksShows(dates[1]));
      dispatch(loadUpcomingShows(dates[2]));
    };

  } 
  catch (dispatch) {
    console.log('error in the catch')
    dispatch(showHasErrored(true));
  }
}

