import React, { useState } from 'react'
// import actions from 'actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'
// import {
// 	Link,
// 	ProfileBox
// } from '@components'
import Link from '@components/link'
import ProfileBox from '@components/profilebox'
import { Row, Col } from '@components/grid'
import { auth, logout } from 'actions/auth'

// const mapStateToProps = (state) => ({
// 	profile: state.Auth.profile
// })

// const mapDispatchToProps = (dispatch) => ({
// 	auth: (details, fakeResponse) => dispatch(auth(details, fakeResponse)),
// 	logout: () => dispatch(logout())
// })

function Authentication({ t }) {

	const [hasDispatched, dispatched] = useState(false)
	const dispatch = useDispatch()
	if(!hasDispatched) {
		dispatched(true)
		dispatch(auth())
	}

	const authorized = useSelector(state => state.Auth.authorized)
	const authorizing = useSelector(state => state.Auth.authorizing)
	const profile = useSelector(state => state.Auth.profile)

	if(authorized) return (
		<ProfileBox
			authorizing={authorizing}
			profile={profile}
			logout={() => dispatch(logout())}
			translations={{
				"Log out": t("Log out")
			}}
		/>
	)
	else return (
		<Row
			type="flex"
			justify="end"
			gutter={{
				xs: 10,
				sm: 20,
				md: 40,
			}}
		>
			<Col>
				<Link
					to={"/" + t("links-login")}
					style={{color: "grey"}}
				>
					{t("Log in")}
				</Link>
			</Col>

			<Col>
				<Link
					to={"/" + t("links-register")}
					type="primary"
					style={{fontWeight: "bold"}}
				>
					{t("Register")}
				</Link>
			</Col>
		</Row>
	)
}

export default withTranslation()(Authentication)
