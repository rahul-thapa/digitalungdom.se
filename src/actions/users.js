import createAsyncFunction from './createAsyncFunction.js'
import { timeToHex } from 'utils/time'

const esc = encodeURIComponent;
const query = params => Object.keys( params )
  .map( k => esc( k ) + '=' + esc( params[ k ] ) )
  .join( '&' )

const Users = {
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/agora/get/user' }, [] ),
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/agora/get/profile_picture' }, [] ),
}

export function getUser( { username, dateAfter, dateBefore, sort, hypagora, id } ) {
  if ( !sort ) sort = "new";
  if ( !hypagora ) hypagora = "";
  if ( !dateBefore ) dateBefore = timeToHex( Date.now() ).hex
  if ( !dateAfter ) dateAfter = timeToHex( 0 ).hex
  return {
    // Types of actions to emit before and after
    types: [ 'GET_USER_REQUEST', 'GET_USER_SUCCESS', 'GET_USER_FAILURE' ],
    // Check the cache (optional):
    // Perform the fetching:
    callAPI: () => fetch( "/api/agora/get/user?" + query( { username, dateAfter, dateBefore, sort, hypagora } ) ),
    callbacks: [
      (response, payload) => (
        {
          type: "GET_AGORAGRAMS_SUCCESS",
          response,
          payload
        }
      )
    ],
    // Arguments to inject in begin/end actions
    payload: { username, dateAfter, dateBefore, sort, hypagora, url: "/api/agora/get/user" }
  }
}

export default Users
