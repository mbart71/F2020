import { createAction, props } from '@ngrx/store';
import { IRace, Bid } from '@f2020/data';

const loadRaces = createAction('[Races] Load Races');

const loadRacesSuccess = createAction(
  '[Races] Load Races Success',
  props<{ races: IRace[] }>(),
);

const loadRacesFailure = createAction(
  '[Races] Load Races Failure',
  props<{ error: any }>(),
);

const selectRace = createAction(
  '[Races] Race page',
  props<{ country: string }>(),
);

const loadYourBid = createAction(
  '[Enter bid page] Load your bid',
);

const loadYourBidSuccess = createAction(
  '[Bid API] Load your bid Success',
  props<{ bid: Partial<Bid> }>(),
);

const loadYourBidFailure = createAction(
  '[Bid API] Load your bid Failure',
  props<{ error: any }>(),
);

const updateYourBid = createAction(
  '[Enter bid page] Update the your bid',
  props<{bid: Bid}>()
);

const updateYourBidFailure = createAction(
  '[Bid API] Update your bid Failure',
  props<{ error: any }>(),
);

const loadBids = createAction(
  '[Race page] Load bids',
);

const loadBidsSuccess = createAction(
  '[Bid API] Load bids Success',
  props<{ bids: Bid[] }>(),
);

const loadBidsFailure = createAction(
  '[Bid API] Load bids Failure',
  props<{ error: any }>(),
);

const loadBid = createAction(
  '[Bid page] Load bid',
  props<{uid: string}>()
);

const loadBidSuccess = createAction(
  '[Bid API] Load bid Success',
  props<{ bid: Bid }>(),
);

const loadBidFailure = createAction(
  '[Bid API] Load bid Failure',
  props<{ error: any }>(),
);

const submitBid = createAction(
  '[Bid page] submit bid',
);

const submitBidSuccess = createAction(
  '[Bid API] Submit bid Success',
);

const submitBidFailure = createAction(
  '[Bid API] Submit bid Failure',
  props<{ error: any }>(),
);

export const RacesActions = {
  loadRaces,
  loadRacesSuccess,
  loadRacesFailure,
  selectRace,
  loadYourBid,
  loadYourBidSuccess,
  loadYourBidFailure,
  loadBids,
  loadBidsSuccess,
  loadBidsFailure,
  loadBid,
  loadBidSuccess,
  loadBidFailure,
  updateYourBid,
  updateYourBidFailure,
  submitBid,
  submitBidSuccess,
  submitBidFailure
};

