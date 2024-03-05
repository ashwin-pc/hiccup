import { useMethods } from 'modules/hooks'
import { AppState, AppStore } from './types'

const EMPTY_STATE: AppStore = {
  state: AppState.UNINITIALIZED,
}

export const useStore = () => {
  const [store, dispatch] = useMethods(methods, EMPTY_STATE)

  return {
    store,
    dispatch,
  }
}

const methods = (state: AppStore) => ({
  setStore: (store: AppStore) => store,

  setAppState: (appState: AppState) => {
    state.state = appState
  },

  toggleEditing: () => {
    if (state.state === AppState.LOADING) return
    state.state =
      state.state === AppState.EDITING ? AppState.READY : AppState.EDITING
  },

  resetStore: () => EMPTY_STATE,
})

interface StoreActionMethods
  extends Omit<ReturnType<typeof methods>, 'setStore' | 'resetStore'> {
  setStore: (store: AppStore) => void
  resetStore: () => void
}

export type StoreActions = StoreActionMethods
