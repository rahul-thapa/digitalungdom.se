import React from 'react'
// import { Comment } from 'containers'
import Comment from 'containers/comment'

const Comments = ({ children, level = 0 }) => {
	return children.map(child => (
		<Comment
			key={child}
			child={child}
			level={level}
		/>
	))
}

export default (Comments)
