 /* eslint-disable no-case-declarations */

export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_USER_DATA = 'SET_USER_DATA';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_USER_ATTRIBUTES = 'SET_USER_ATTRIBUTES';

// const initialProfileData = fromJS({
//   IN_SB_010_FIZ: [{}],
//   IN_SB_010_DOCS: [{}],
//   IN_SB_010_ADRESS: [{}],
//   IN_SB_010_EMAIL: [{}],
//   IN_SB_010_PHONE: [{}],
//   IN_SB_010_BANK_INFO: [{}]
// });

export const initialState = {
  userId: null,
  useRole: null,
  userInfo: { email: '', login: '' },
  userLogin: { username: '', pass: '' },
  userRegistration: { email: '', username: '', pass: '' },
};

export default (state = initialState, action) => {
  const { ent, indx, attr, value } =
    typeof action.payload === 'object' ? action.payload : {};

  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };

    case SET_USER_DATA:
      return { ...state, ...action.payload };

    case SET_USER_ROLE:
      return { ...state, userRole: action.payload };

    case USER_LOGIN:
      return { ...state, userLogin: action.payload };

    case USER_REGISTRATION:
      return { ...state, userRegistration: action.payload };

    default:
      return state;
  }
};

export const setProfileEditableData = data => {
  return dispatch => {
    const person = data.E_PERSON;

    const IN_SB_010_FIZ = [
      Object.keys(person).reduce((obj, currentKey) => {
        return unnecessaryFields[currentKey] ||
          typeof person[currentKey] === 'object'
          ? obj
          : { ...obj, [currentKey]: person[currentKey] };
      }, {})
    ];

    const IN_SB_010_DOCS = person.E_P_DOCUMENT.map(el => ({
      ...omitProperties(el),
      P_DOCUMENT_SCAN: ''
    })).filter(el => el.D_STATUS !== 'e');

    const IN_SB_010_PHONE = person.E_PHONE.map(el => omitProperties(el)).filter(
      el => el.D_STATUS !== 'e'
    );

    const IN_SB_010_ADRESS = person.E_ADDRESS.map(el =>
      omitProperties(el)
    ).filter(el => el.D_STATUS !== 'e');

    const IN_SB_010_EMAIL = person.E_EMAIL.map(el => omitProperties(el)).filter(
      el => el.D_STATUS !== 'e'
    );

    const IN_SB_010_BANK_INFO = person.E_BANK_INFO
      ? person.E_BANK_INFO.map(el => omitProperties(el)).filter(
          el => el.D_STATUS !== 'e'
        )
      : [{}];

    const IN_SB_010_DSR_ID_FIZ = `${person.ID}:${person.VERSION}`;

    const newData = {
      IN_SB_010_FIZ,
      IN_SB_010_DOCS,
      IN_SB_010_PHONE,
      IN_SB_010_ADRESS,
      IN_SB_010_EMAIL,
      IN_SB_010_BANK_INFO
    };

    const oldData = Object.keys(newData).reduce(
      (t, c) => ({ ...t, [c + '_OLD']: newData[c] }),
      {}
    );

    dispatch({
      type: SET_PROFILE_EDITABLE_DATA,
      payload: fromJS({
        ...newData,
        IN_SB_010_DSR_ID_FIZ,
        IN_SB_010_CLIENT_TYPE: 'C_FIZ',
        IN_SB_010_CLIENT_PHOTO: ''
      })
    });

    dispatch({
      type: SET_SITIZENSHIP,
      payload: IN_SB_010_FIZ[0]['D_SITIZENSHIP_COUNTRY'] === '92'
    });

    dispatch({
      type: SET_PROFILE_OLD_DATA,
      payload: oldData
    });
  };
};

export const mergeProfileEntityItem = (ent, indx, value) => ({
  type: MERGE_PROFILE_ENT_ITEM,
  payload: { ent, indx, value }
});

export const setUserDate = (value) => ({
  type: SET_USER_DATA,
  payload: value
});

export const setUserRole = (value) => ({
  type: SET_USER_ROLE,
  payload: value
});

export const setUserLogin = (value) => ({
  type: USER_LOGIN,
  payload: value
});