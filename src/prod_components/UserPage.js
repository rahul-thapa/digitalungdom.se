import React, { useState, useEffect, useRef } from 'react'
import { Button, Row, Col, Icon, Dropdown, Menu, Modal } from 'antd'
import UserEditingForm from '@components/userEditingForm'
import FileSelector from '@components/fileSelector'
import PhotoEditor from '@components/PhotoEditor'
import ProfilePicture from 'containers/ProfilePicture'
import ProfilePictureViewer from '@components/profilePictureViewer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faTrash } from '@fortawesome/free-solid-svg-icons'

const menu = ( photoEditorRef ) => (
  <Menu>
    <Menu.Item>
      <FileSelector handleImgSrc={ (file, imgSrc) => photoEditorRef.current.openCropperModal(file, imgSrc) }/>
    </Menu.Item>
    <Menu.Item>
      Ta bort nuvarande profilbild
    </Menu.Item>
  </Menu>
);

const moreUserMenu = ( userId, canEdit, modalVisible, showModal ) => {
  if ( canEdit ) {
    return (

      <Menu>
        <Menu.Item>
          <span onClick={showModal}>
            <FontAwesomeIcon style={{marginRight: 4}} icon={faTrash} /> Radera konto
          </span>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu>
        <Menu.Item>
          <span onClick={()=> console.log("Deleting " + userId)}>
            <FontAwesomeIcon style={{marginRight: 4}} icon={faFlag} /> Anmäl användare
          </span>
        </Menu.Item>
      </Menu>
    )
  }
}

function editingButton( setEditing, canEdit ) {
  if ( canEdit ) {
    return (
      <Button
  			ghost
  			onClick={()=> {
  				setEditing(true)
  				}
  			}
  			style={{color: "rgba(0,0,0,0.5)", width: '100%', marginTop: 20, border: "1px solid rgba(0,0,0,0.2)"}}
			>
				Redigera profil
			</Button>
    )
  }
}

function editPictureButton( setEditing, canEdit, photoEditorRef ) {
  if ( canEdit ) {
    return (
      <span
        className="highlightable"
        style={{
          color: "rgba(0,0,0,0.6)",
          position: 'absolute',
          top: 100,
        }}
      >
        <Dropdown
          overlay={menu(photoEditorRef)}
          trigger={["click"]}
        >
          <Row
            type="flex"
            gutter={6}
          >
            <Col>
              <Icon
              type="edit"
              style={{ color: "rgba(0,0,0,0.6)" }}
              />
            </Col>

            <Col>
              Redigera profilbild
            </Col>
          </Row>
        </Dropdown>
      </span>
    )
  }
}

function RenderProfile({ user, canEdit, edit, userColour, setUserColour, photoEditorRef }) {
  const [ editing, setEditing ] = useState( false );

  let hrefAdress = user.profile.url
  if ( user.profile.url ) {
    const newRootAdress = ( user.profile.url.includes( "//" ) ) ? "" : "//"
    hrefAdress = newRootAdress + user.profile.url
  }

  // With hook determine width of window
  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );
  useEffect( () => {
    function handleResize() {
      setWindowWidth( window.innerWidth );
    }

    window.addEventListener( 'resize', handleResize );
    return () => window.removeEventListener( 'resize', handleResize );
  }, [] );

  let renderURLText = user.profile.url
  if ( user.profile.url ) {
    if ( user.profile.url.length > 32 ) {
      if ( windowWidth < 730 ) {
        renderURLText = user.profile.url.substring( 0, 50 ) + '...';
      } else if ( windowWidth < 300 ) {
        renderURLText = user.profile.url.substring( 0, 32 ) + '...';
      } else {
        renderURLText = user.profile.url.substring( 0, 26 ) + '...';
      }
    }
  }

  if ( editing === false ) {
    return (
      <div>
    	<p
	        style={{
	          marginTop: 8,
	          marginBottom: 24,
	          color: 'rgba(0,0,0,0.9)',
	          fontSize: 14,
            whiteSpace: "pre-wrap"
	        }}
        >
					{user.profile.bio}
        </p>

				<div style={{fontSize: 13, margin: "-8px 0px"}}>
					<a
					href={hrefAdress}
					target="_blank"
          rel="noopener noreferrer"
					>
						{
							user.profile.url?
							(
								<p>
										<Icon
										type="paper-clip"
										style={{ color: 'rgba(0,0,0,.25)', marginRight: 6 }}
										/>
  									{renderURLText}
								</p>
							):
							null
						}
					</a>
				</div>

				<div style={{fontSize: 13, margin: "-8px 0px"}}>
					{
						user.details.email?
						(
							<p>
									<Icon
									type="mail"
									style={{ color: 'rgba(0,0,0,.25)', marginRight: 6  }}
									/>
								{user.details.email}
							</p>
						):
						null
					}
				</div>

				<p style={{fontSize: 13, margin: "-8px 0px"}}>
						<Icon
						type="clock-circle"
						style={{ color: 'rgba(0,0,0,.25)', marginRight: 6 }}
						/>
						Medlem sedan {(new Date(parseInt(user._id.substring(0, 8), 16) * 1000)).toISOString().substring(0, 10)}
				</p>

        {editingButton(setEditing, canEdit)}

			</div>
    )
  } else {
    return (
      <div>
        {editPictureButton(setEditing, canEdit, photoEditorRef)}

        <UserEditingForm
  				user={user}
  				cancel={()=> {
  					setEditing(false);
  					setUserColour(userColour)
  				}}
          submit={()=> {
            setEditing(false);
          }}
  				setUserColour={setUserColour}
          edit={edit}
  			/>
      </div>
    )
  }
}

function UserPage( { user, loading, noUser, canEdit, edit, posts, deleteUserFromModal, dispatchImageData64 } ) {

  const [ userColour, setUserColour ] = useState( user.profile.colour ? user.profile.colour : '#83aef2' );
  const [ modalVisible, setModalVisibility ] = useState( false );

  const photoEditorRef = useRef();

  const showModal = () => {
    setModalVisibility( true )
  };

  const handleDelete = () => {
    deleteUserFromModal( user._id )
  };

  const handleCancel = () => {
    setModalVisibility( false )
  };

  return (
    <div>

			<Row
				type="flex"
				justify="center"
				style={{marginTop: 30}}
			>

				<Col
					xs={{ span: 22 }}
					sm={{ span: 22 }}
					md={{ span: 20 }}
					lg={{ span: 18 }}
					xl={{ span: 16 }}
				>

					<Row
						style={{width: "100%"}}
						type = "flex"
						justify="space-between"
            gutter={16}
					>

						<Col
							xs={{span: 22}}
							sm={{span: 22}}
							md={{span: 11}}
							lg={{span: 10}}
							type = "flex"
							justify="center"
            >

							<Col
								style={{
                  padding: 0,
									background: "white",
									border:'1px solid rgba(0,0,0,0.1)',
									borderRadius: 8,
									marginBottom: 16,
                  paddingBottom: 10
								}}
							>

								<Row
									type="flex"
									justify="space-between"
                  className="du-background"
									style={{
										background: userColour,
                    margin: 0,
										padding: 10,
										borderTopRightRadius: 8,
										borderTopLeftRadius: 8,
										textAlign: 'center',
										height: 80,
										marginBottom: 20,
										paddingTop: 20,
										paddingLeft: 30,

									}}
                >
									<Col>
                    <span className="highlightable">
  										<ProfilePicture
  											style={{position: 'absolute'}}
  											id={user._id}
                        size={80}
  										/>
                    </span>
                    <ProfilePictureViewer
                    id={user._id}
                    />
									</Col>

                  <Col>

                    <Dropdown
                    trigger={['click']}
                    overlay={moreUserMenu(user._id, canEdit, modalVisible, showModal)}
                    >

                      <Icon
                      type="ellipsis"
                      style={{ color: "rgba(0,0,0,0.6)", fontSize: 26, marginRight: 20, marginTop: 16 }}
                      />

                    </Dropdown>
                  </Col>
								</Row>

								<div
									style={{
                    padding: "16px 30px",
                    fontSize: 14,
                  }}
								>

									<h2
										style={{
                      margin: 0,
                      fontWeight: 'bold'
                    }}
									>
										{user.details.name}
									</h2>


  									<p style={{fontSize:14, marginTop: 0, color: "rgba(0,0,0,0.7)"}}>
                      <span
                        className="du-colour"
                        style={{ color: userColour }}>
                        @{user.details.username}
                      </span>
                      <span>{user.profile.status ? ` - ${user.profile.status}` : ''}</span>
  									</p>

									<RenderProfile
                    user={user}
                    canEdit={canEdit}
                    edit={edit}
                    userColour={userColour}
                    setUserColour={setUserColour}
                    photoEditorRef={photoEditorRef}
                  />

								</div>
							</Col>
						</Col>

            <Col
            xs={{ span: 22 }}
            sm={{ span: 22 }}
            md={{ span: 13 }}
            lg={{ span: 14 }}>

             {posts}

            </Col>
					</Row>
				</Col>
			</Row>

      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{textAlign: "center", maxWidth: 300}}
      >
        <h1 style={{fontSize: 18, fontWeight: 'bold'}}> Är du säker? <span role="img" aria-label="trash">🗑</span> </h1>
        <p>Ifall du trycker på "Radera" kommer ditt konto raderas permanent.</p>
        <Row type="flex" justify="center" gutter={16}>
          <Col span={12}>
            <Button
              style={{width: "100%"}}
              onClick={handleCancel}
            >
              Avbryt
            </Button>
          </Col>
          <Col span={12}>
            <Button
              style={{width: "100%"}}
              type="danger"
              onClick={handleDelete}
              >
              Radera
            </Button>
          </Col>
        </Row>
      </Modal>
      <PhotoEditor dispatchImageData64={dispatchImageData64} ref={photoEditorRef}/>
		</div>
  )
}

export default UserPage
