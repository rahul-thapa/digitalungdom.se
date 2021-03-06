import React, {useState} from 'react'
import Link from 'containers/Link'
import Star from '@components/star'
import Actions from 'containers/actions'
import './comment.css'
import { Divider, Row, Col } from 'antd'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
require('./comment.css')


const Comment = ({ comment, comments, children, level, asteri }) => {

	const [isCollapsed, collapse] = useState(false)
	const isAuthor = useSelector(state => state.Auth.profile.details._id === comment.author)

	// Must authenticate modal
	const [mustAuthModalVisible, showMustAuthModal] = useState(false)
	const onMustAuthCancel = () => showMustAuthModal(false);
	const onMustAuthConfirm = () => showMustAuthModal(false);

	return (
		<Row
			type="flex"
			justify="space-around"
			style={level === 0 ? {marginBottom: 16} : {}}
		>
			<Col
				xs={{span: 2}}
				sm={{span: 1}}
				// span={2}
				// offset={1}
				style={{textAlign: "center"}}
			>
				{
					isCollapsed ?
					<Star
						type="plus-circle"
						onClick={() => collapse(!isCollapsed)}
					/>
					:
					<Star
						// key={"star" + comment._id}
						type="minus-circle"
						onClick={() => collapse(!isCollapsed)}
					/>
				}
				{
					!isCollapsed &&
					<Divider
						type="vertical"
						style={{
							height: "calc(100% - 20px)",
							display: "block",
							margin: "0 auto",
							width: 3,
							cursor: "pointer",
							background: ["#fac89e","#e3e891","#c2fc99","#a3fcb3","#92e8d5","#96c8f2","#ada8ff","#ce94f7","#ed94dd","#fea8bb"][level]
						}}
						onClick={() => collapse(!isCollapsed)}
					/>
				}
			</Col>
			<Col
				xs={{span: 22}}
				sm={{span: 23}}
			>
				<div>
					<Link linkType="user" id={comment.author}></Link>
					<span> {comment.stars === 1 ? "1 stjärna" : comment.stars + " stjärnor"}</span>
				</div>
				{
					!isCollapsed &&
					<React.Fragment>
						<ReactMarkdown
						source={!comment.deleted ? comment.body : "`[raderad kommentar]`"}
						className="comment"
						/>
						<Actions
							id={comment._id}
							author={comment.author}
							isAuthor={isAuthor}
						/>
						{children}
					</React.Fragment>
				}
			</Col>
		</Row>
	)
}

export default Comment
