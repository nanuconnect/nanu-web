import firebase from '../../functions/Firestore'

export const userData = username => async dispatch => {
  let db = firebase.firestore()
  let res = await db
    .collection('users')
    .where('username', '==', username)
    .get()
  let res1 = []
  res.forEach(doc => {
    let res2 = doc.data()
    res1.push({ ...res2, id: doc.id })
  })
  return dispatch({
    type: 'USER_SINGLE',
    payload: res1[0]
  })
}

export const userDataByCode = braceletId => async dispatch => {
  let db = firebase.firestore()
  let res = await db
    .collection('users')
    .where('braceletIds', 'array-contains', braceletId)
    .get()
  let res1 = []
  res.forEach(doc => {
    let res2 = doc.data()
    res1.push({ ...res2, id: doc.id })
  });
  return dispatch({
    type: 'USER_SET',
    payload: res1[0]?.username
  })
}