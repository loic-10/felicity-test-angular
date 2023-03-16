import { createSlice, PayloadAction } from 'ngrx-slice';
import {
  Service,
  ServiceCreate,
  ServiceUpdate,
  Subscription,
} from '../../../../interfaces';

interface ServiceState {
  service?: Service | null;
  serviceLoading: boolean;
  serviceError: string;
  serviceSubmitLoading: boolean;
  serviceSubmitError: string;
  serviceSubmitSuccess: string;
  services: Service[];
  servicesLoading: boolean;
  servicesError: string;
  subscriptionsByService: { [id: number]: Subscription[] };
  subscriptionsByServiceLoading: { [id: number]: boolean };
  subscriptionsByServiceError: { [id: number]: string };
}

const initialState: ServiceState = {
  service: null,
  serviceLoading: false,
  serviceSubmitLoading: false,
  serviceError: '',
  servicesError: '',
  serviceSubmitError: '',
  serviceSubmitSuccess: '',
  services: [],
  servicesLoading: false,
  subscriptionsByService: {},
  subscriptionsByServiceLoading: {},
  subscriptionsByServiceError: {},
};

export const {
  selectors: ServiceSelectors,
  actions: ServiceActions,
  ...ServiceFeature
} = createSlice({
  name: 'service',
  initialState,
  reducers: {
    restartDefaultState: (state) => {
      state.serviceLoading = false;
      state.serviceError = '';
      state.service = null;
      state.serviceSubmitLoading = false;
      state.serviceSubmitError = '';
      state.serviceSubmitSuccess = '';
      state.servicesLoading = false;
      state.servicesError = '';
    },
    tryGetAllServices: (state) => {
      state.servicesLoading = true;
      state.servicesError = '';
    },
    successGetAllServices: (
      state,
      {
        services,
        error,
      }: PayloadAction<{ services?: Service[]; error?: string }>
    ) => {
      state.servicesLoading = false;
      if (services) state.services = services;
      state.servicesError = error || '';
    },
    tryGetOneService: (state, action: PayloadAction<{ id: number }>) => {
      state.serviceLoading = true;
      state.serviceError = '';
    },
    successGetOneService: (
      state,
      { service, error }: PayloadAction<{ service?: Service; error?: string }>
    ) => {
      state.serviceLoading = false;
      state.service = service;
      state.serviceError = error || '';
    },
    tryCreateServiceDto: (
      state,
      action: PayloadAction<{ serviceCreate: ServiceCreate }>
    ) => {
      state.serviceSubmitLoading = true;
      state.serviceSubmitError = '';
      state.serviceSubmitSuccess = '';
    },
    successCreateServiceDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{ service?: Service; error?: string; success?: string }>
    ) => {
      state.serviceSubmitLoading = false;
      state.serviceSubmitSuccess = success || '';
      state.serviceSubmitError = error || '';
    },
    tryUpdateServiceDto: (
      state,
      action: PayloadAction<{
        serviceUpdate: ServiceUpdate;
        id: number;
      }>
    ) => {
      state.serviceSubmitLoading = true;
      state.serviceSubmitError = '';
      state.serviceSubmitSuccess = '';
    },
    successUpdateServiceDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{ service?: Service; error?: string; success?: string }>
    ) => {
      state.serviceSubmitLoading = false;
      state.serviceSubmitSuccess = success || '';
      state.serviceSubmitError = error || '';
    },
    tryDeleteServiceDto: (state, action: PayloadAction<{ id: number }>) => {
      state.serviceSubmitLoading = true;
      state.serviceSubmitError = '';
      state.serviceSubmitSuccess = '';
    },
    successDeleteServiceDto: (
      state,
      {
        success,
        error,
      }: PayloadAction<{ service?: Service; error?: string; success?: string }>
    ) => {
      state.serviceSubmitLoading = false;
      state.serviceSubmitSuccess = success || '';
      state.serviceSubmitError = error || '';
    },
    tryGetAllSubscriptionsByService: (
      state,
      { id }: PayloadAction<{ id: number }>
    ) => {
      state.subscriptionsByServiceLoading[id] = true;
      state.subscriptionsByServiceError[id] = '';
    },
    successGetAllSubscriptionsByService: (
      state,
      {
        id,
        subscriptions,
        error,
      }: PayloadAction<{
        id: number;
        subscriptions?: Subscription[];
        error?: string;
      }>
    ) => {
      if (subscriptions) state.subscriptionsByService[id] = subscriptions;
      state.subscriptionsByServiceLoading[id] = false;
      state.subscriptionsByServiceError[id] = error || '';
    },
  },
});
