import createAsyncFunction, { query } from './createAsyncFunction.js'

const Agora = {
  ...createAsyncFunction( 'agorize_post', { method: 'POST', route: '/api/agora/agorize/post' }, [] ),
  ...createAsyncFunction( 'agorize_comment', { method: 'POST', route: '/api/agora/agorize/agorize_comment' }, [] ),

  ...createAsyncFunction( 'asteri', { method: 'POST', route: '/api/agora/asteri' }, [] ),

  ...createAsyncFunction( 'anti_agorize', { method: 'POST', route: '/api/agora/anti_agorize' }, [] ),
  ...createAsyncFunction( 'meta_agorize', { method: 'POST', route: '/api/agora/meta_agorize' }, [] ),

  ...createAsyncFunction( 'get_agoragrams', { method: 'GET', route: '/api/agora/get/agoragrams' }, [] ),

  ...createAsyncFunction( 'report', { method: 'POST', route: '/api/report' }, [] ),

  ...createAsyncFunction( 'get_agoragram', { method: 'GET', route: '/api/agora/get/agoragram' }, [] ),
  ...createAsyncFunction( 'get_comments', { method: 'GET', route: '/api/get_comments' }, [] ),

  viewComments: ( post ) => ( {
    type: 'VIEW_COMMENTS',
    post
  } )

}

/*
Agorize
Authentication required
/api/agorize
Fields: {
  body,
  type,
  role

  // Post specific
  title,
  tags,
  hypagora

  // Comment specific
  replyTo
}
*/

export const redirected = () => ({
  type: 'REDIRECT_TO_POST'
})

export function agorize( info, me, type ) {
  return {
    types: [
      'AGORIZE_REQUEST',
      'AGORIZE_SUCCESS',
      'AGORIZE_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/agorize/" + type, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          ...info,
          hypagora: "general"
        } )
      } ),
    payload: {
      ...info,
      me
    }
  }
}

export function agorizePost( info, me ) {
  return {
    types: [
      'AGORIZE_REQUEST',
      'AGORIZE_SUCCESS',
      'AGORIZE_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/agorize/post", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          ...info,
          hypagora: "general"
        } )
      } ),
    payload: {
      ...info,
      me
    }
  }
}

export function agorizeComment( info, me ) {
  return {
    types: [
      'AGORIZE_REQUEST',
      'AGORIZE_SUCCESS',
      'AGORIZE_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/agorize/comment", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          ...info,
          hypagora: "general"
        } )
      } ),
    payload: {
      ...info,
      me
    }
  }
}

export const filterAgora = ( filter, edge ) => ( {
  type: "UPDATE_AGORA_FILTER",
  edge,
  ...filter
} )

export function getAgoragrams( filter, edge ) {
  const listQuery = (
    filter.hypagora !== "" ?
      filter.hypagora + "?t=" + filter.time + "&s=" + filter.sort
      :
      undefined
  )

  return {
    types: [
      'GET_AGORAGRAMS_REQUEST',
      'GET_AGORAGRAMS_SUCCESS',
      'GET_AGORAGRAMS_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/get/agoragrams?" + query( filter ) ),
    callbacks: [
      ( response ) => ( {
        type: "GET_SEVERAL_USERS_SUCCESS",
        response,
        payload: {
          type: "objectid"
        }
      } )
    ],
    shouldCallAPI: state => (edge || state.Agora.lists[listQuery] === undefined),
    payload: {
      ...filter,
      query: query( filter )
    }
  }
}

export function getAgoragram( agoragramShortID ) {
  return {
    types: [
      'GET_AGORAGRAM_REQUEST',
      'GET_AGORAGRAM_SUCCESS',
      'GET_AGORAGRAM_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/get/agoragram?" + query( { agoragramShortID } ) ),
    callbacks: [
      ( response ) => ( {
        type: "GET_SEVERAL_USERS_SUCCESS",
        response
      } )
    ],
    shouldCallAPI: state => state.Agora.agoragrams[agoragramShortID] !== false,
    payload: {
      agoragramShortID,
    }
  }
}

export function antiAgorize( agoragramID ) {
  return {
    types: [
      'ANTI_AGORIZE_REQUEST',
      'ANTI_AGORIZE_SUCCESS',
      'ANTI_AGORIZE_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/anti_agorize", {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { agoragramID } )
      } ),
    payload: {
      agoragramID
    }
  }
}

export function asteri( agoragramID ) {
  return {
    types: [
      'ASTERI_REQUEST',
      'ASTERI_SUCCESS',
      'ASTERI_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/agora/asteri", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          agoragramID
        } )
      } ),
    shouldCallAPI: state => state.Auth.authorized,
    payload: {
      agoragramID
    }
  }
}

export function reportAgoragram( id, reason ) {
  return {
    types: [
      'REPORT_AGORAGRAM_REQUEST',
      'REPORT_AGORAGRAM_SUCCESS',
      'REPORT_AGORAGRAM_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/report", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          place: "agoragram",
          id,
          reason
        } )
      } ),
    payload: {
      place: "agoragram",
      id,
      reason
    }
  }
}

export function addPostToHiddenPosts(postId){
  return {
    type: "ADD_HIDDEN_POST",
    postId
  }
}

export default Agora
