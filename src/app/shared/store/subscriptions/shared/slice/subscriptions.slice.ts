import { createSlice, PayloadAction } from 'ngrx-slice';
import {
  Subscription,
  SubscriptionCreate,
  SubscriptionUpdate,
} from '../../../../interfaces';

interface SubscriptionState {
  subscription?: Subscription | null;
  subscriptionLoading: boolean;
  subscriptionError: string;
  subscriptionSubmitLoading: boolean;
  subscriptionSubmitError: string;
  subscriptionSubmitSuccess: string;
  subscriptions: Subscription[];
  subscriptionsLoading: boolean;
  subscriptionsError: string;
}

const initialState: SubscriptionState = {
  subscription: null,
  subscriptionLoading: false,
  subscriptionSubmitLoading: false,
  subscriptionError: '',
  subscriptionsError: '',
  subscriptionSubmitError: '',
  subscriptionSubmitSuccess: '',
  subscriptions: [],
  subscriptionsLoading: false,
};

export const {
  selectors: SubscriptionSelectors,
  actions: SubscriptionActions,
  ...SubscriptionFeature
} = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    restartDefaultState: (state) => {
      state.subscriptionLoading = false;
      state.subscriptionError = '';
      state.subscription = null;
      state.subscriptionSubmitLoading = false;
      state.subscriptionSubmitError = '';
      state.subscriptionSubmitSuccess = '';
      state.subscriptionsLoading = false;
      state.subscriptionsError = '';
    },
    tryGetAllSubscriptions: (state) => {
      state.subscriptionsLoading = true;
      state.subscriptionsError = '';
    },
    successGetAllSubscriptions: (
      state,
      {
        subscriptions,
        error,
      }: PayloadAction<{ subscriptions?: Subscription[]; error?: string }>
    ) => {
      state.subscriptionsLoading = false;
      if (subscriptions) state.subscriptions = subscriptions;
      state.subscriptionsError = error || '';
    },
    tryGetOneSubscription: (state, action: PayloadAction<{ id: number }>) => {
      state.subscriptionLoading = true;
      state.subscriptionError = '';
    },
    successGetOneSubscription: (
      state,
      {
        subscription,
        error,
      }: PayloadAction<{ subscription?: Subscription; error?: string }>
    ) => {
      state.subscriptionLoading = false;
      state.subscription = subscription;
      state.subscriptionError = error || '';
    },
    tryCreateSubscriptionDto: (
      state,
      action: PayloadAction<{ subscriptionCreate: SubscriptionCreate }>
    ) => {
      state.subscriptionSubmitLoading = true;
      state.subscriptionSubmitError = '';
      state.subscriptionSubmitSuccess = '';
    },
    successCreateSubscriptionDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{
        subscription?: Subscription;
        error?: string;
        success?: string;
      }>
    ) => {
      state.subscriptionSubmitLoading = false;
      state.subscriptionSubmitSuccess = success || '';
      state.subscriptionSubmitError = error || '';
    },
    tryUpdateSubscriptionDto: (
      state,
      action: PayloadAction<{
        subscriptionUpdate: SubscriptionUpdate;
        id: number;
      }>
    ) => {
      state.subscriptionSubmitLoading = true;
      state.subscriptionSubmitError = '';
      state.subscriptionSubmitSuccess = '';
    },
    successUpdateSubscriptionDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{
        subscription?: Subscription;
        error?: string;
        success?: string;
      }>
    ) => {
      state.subscriptionSubmitLoading = false;
      state.subscriptionSubmitSuccess = success || '';
      state.subscriptionSubmitError = error || '';
    },
    tryDeleteSubscriptionDto: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.subscriptionSubmitLoading = true;
      state.subscriptionSubmitError = '';
      state.subscriptionSubmitSuccess = '';
    },
    successDeleteSubscriptionDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{
        subscription?: Subscription;
        error?: string;
        success?: string;
      }>
    ) => {
      state.subscriptionSubmitLoading = false;
      state.subscriptionSubmitSuccess = success || '';
      state.subscriptionSubmitError = error || '';
    },
  },
});
