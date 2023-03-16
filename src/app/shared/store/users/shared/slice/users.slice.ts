import { createSlice, PayloadAction } from 'ngrx-slice';
import { User, Subscription, Login, Register } from '../../../../interfaces';

interface UserState {
  user?: User | null;
  userLoading: boolean;
  userError: string;
  currentUser?: User | null;
  currentUserLoading: boolean;
  currentUserError: string;
  userSubmitLoading: boolean;
  userSubmitError: string;
  userSubmitSuccess: string;
  users: User[];
  usersLoading: boolean;
  usersError: string;
  subscriptionsByUser: { [id: number]: Subscription[] };
  subscriptionsByUserLoading: { [id: number]: boolean };
  subscriptionsByUserError: { [id: number]: string };
}

const initialState: UserState = {
  user: null,
  userLoading: false,
  userError: '',
  currentUser: null,
  currentUserLoading: false,
  currentUserError: '',
  userSubmitLoading: false,
  usersError: '',
  userSubmitError: '',
  userSubmitSuccess: '',
  users: [],
  usersLoading: false,
  subscriptionsByUser: {},
  subscriptionsByUserLoading: {},
  subscriptionsByUserError: {},
};

export const {
  selectors: UserSelectors,
  actions: UserActions,
  ...UserFeature
} = createSlice({
  name: 'user',
  initialState,
  reducers: {
    restartDefaultState: (state) => {
      state.userLoading = false;
      state.userError = '';
      state.user = null;
      state.userSubmitLoading = false;
      state.userSubmitError = '';
      state.userSubmitSuccess = '';
      state.usersLoading = false;
      state.usersError = '';
    },
    tryGetAllUsers: (state) => {
      state.usersLoading = true;
      state.usersError = '';
    },
    successGetAllUsers: (
      state,
      { users, error }: PayloadAction<{ users?: User[]; error?: string }>
    ) => {
      state.usersLoading = false;
      if (users) state.users = users;
      state.usersError = error || '';
    },
    tryLogout: (state) => {
      state.currentUser = null;
    },
    tryGetProfile: (state) => {
      state.currentUserLoading = true;
      state.currentUserError = '';
    },
    successGetProfile: (
      state,
      { user, error }: PayloadAction<{ user?: User; error?: string }>
    ) => {
      state.currentUserLoading = false;
      state.currentUser = user;
      state.currentUserError = error || '';
    },
    tryGetOneUser: (state, action: PayloadAction<{ id: number }>) => {
      state.userLoading = true;
      state.userError = '';
    },
    successGetOneUser: (
      state,
      { user, error }: PayloadAction<{ user?: User; error?: string }>
    ) => {
      state.userLoading = false;
      state.user = user;
      state.userError = error || '';
    },
    tryLogin: (state, action: PayloadAction<{ login: Login }>) => {
      state.userSubmitLoading = true;
      state.userSubmitError = '';
      state.userSubmitSuccess = '';
    },
    successLogin: (
      state,
      {
        success,
        error,
      }: PayloadAction<{ user?: User; error?: string; success?: string }>
    ) => {
      state.userSubmitLoading = false;
      state.userSubmitSuccess = success || '';
      state.userSubmitError = error || '';
    },
    tryRegister: (state, action: PayloadAction<{ register: Register }>) => {
      state.userSubmitLoading = true;
      state.userSubmitError = '';
      state.userSubmitSuccess = '';
    },
    successRegister: (
      state,
      {
        success,
        error,
      }: PayloadAction<{ user?: User; error?: string; success?: string }>
    ) => {
      state.userSubmitLoading = false;
      state.userSubmitSuccess = success || '';
      state.userSubmitError = error || '';
    },
    tryGetAllSubscriptionsByUser: (
      state,
      { id }: PayloadAction<{ id: number }>
    ) => {
      state.subscriptionsByUserLoading[id] = true;
      state.subscriptionsByUserError[id] = '';
    },
    successGetAllSubscriptionsByUser: (
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
      if (subscriptions) state.subscriptionsByUser[id] = subscriptions;
      state.subscriptionsByUserLoading[id] = false;
      state.subscriptionsByUserError[id] = error || '';
    },
  },
});
