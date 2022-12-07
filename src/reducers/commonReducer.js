/* eslint-disable no-case-declarations */
export const SET_MODAL = 'SET_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const TOGGLE = 'TOGGLE';
export const ISOPEN = 'ISOPEN';
export const SET_ARC_INVEST_IDEAS = 'SET_ARC_INVEST_IDEAS';

const initialState = {
  toggled: false,
  isOpen: /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent),
  modal: {},
  investIdeas: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return { ...state, modal: action.payload };

    case CLOSE_MODAL:
      return { ...state, modal: { ...state.modal, open: false } };

    case TOGGLE:
      return { ...state, toggled: action.payload };

    case ISOPEN:
      return { ...state, isOpen: false };

    case SET_ARC_INVEST_IDEAS:
      return { ...state, investIdeas: action.payload };

    default:
      return state;
  }
};

export const setModal = payload => ({ type: SET_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });
export const toggle = tg => ({ type: TOGGLE, payload: tg });
export const setIsOpen = () => ({ type: ISOPEN });
