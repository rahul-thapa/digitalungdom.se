import React from 'react';
import Card from 'components/card';
import {
  Skeleton, Row, Col, Dropdown, Tag,
} from 'antd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment, faShare, faStar, faPen, faFlag, faCopy, faEllipsisH, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Time from 'components/time';

function Post({
  loading,
  author,
  avatar,
  forum,
  time,
  stars,
  commentAmmount,
  title,
}) {
  if (loading === true) {
    return (
      <Card>
        <Skeleton avatar />
      </Card>
    );
  }
  return (
    <>
      <Card
        className="agora-post"
        cardStyle={{ padding: 8, marginBottom: 16 }}
        // bodyStyle={{ padding: 8, paddingRight: '5%' }}
      >
        <span
          style={{ color: 'rgba(0,0,0,0.6)', display: 'flex' }}
          className="ShouldOpenPost"
        >
          <Col
            style={{
              textAlign: 'center', paddingTop: 20, width: '10%', minWidth: 56, maxWidth: 72,
            }}
            className="ShouldOpenPost"
          >
            {
              avatar
            }
          </Col>
          <div
            style={{ paddingTop: 8, flex: '1' }}
            span={22}
            className="ShouldOpenPost"
          >
            <Row
              style={{ width: '100%' }}
              type="flex"
              justify="space-between"
              className="ShouldOpenPost"
            >
              <Col>
                {
                  author
                }
              </Col>
              <Col
                className="ShouldOpenPost"
              >
                { true && (
                  <div>
                    <Time time={time}>
                      Time
                    </Time>
                    <span type="vertical" />
                    <span to={`/agora/h/${forum}`}>
                      <Tag>{forum}</Tag>
                    </span>
                  </div>
                )}
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <a to="link">
                <h1>{title}</h1>
              </a>
            </Row>

            <Row
              style={{ width: '100%' }}
              className="ShouldOpenPost"
            />

            <div
              style={{ paddingBottom: 8 }}
              className="ShouldOpenPost"
            />


            <Row style={{ fontSize: 16, marginBottom: 10 }}>

              <Col
                xs={{ span: 6 }}
                sm={{ span: 4 }}
                style={{ textAlign: 'center', height: 30 }}
                className="asteriButton"
              >
                <div className="WillNotOpenPostDiv" style={{ width: '100%', height: '100%', paddingTop: 2 }}>
                  <FontAwesomeIcon style={{ marginRight: 4 }} icon={faStar} />
                  {` ${stars}`}
                </div>
              </Col>

              <Col
                xs={{ span: 6 }}
                sm={{ span: 4 }}
                style={{ textAlign: 'center', height: 30, paddingLeft: 8 }}
                className="optionButton"
              >
                <div className="ShouldOpenPost" style={{ width: '100%', height: '100%', paddingTop: 2 }}>
                  <FontAwesomeIcon style={{ marginRight: 4 }} icon={faComment} />
                  {` ${commentAmmount}`}
                </div>
              </Col>

              <Col
                xs={{ span: 6 }}
                sm={{ span: 4 }}
                style={{ textAlign: 'center', height: 30 }}
                className="optionButton"
              >

                <Dropdown
                  trigger={['click']}
                >

                  <div className="WillNotOpenPostDiv" style={{ width: '100%', height: '100%', paddingTop: 2 }}>
                    <FontAwesomeIcon style={{ marginLeft: 8 }} icon={faShare} />
                  </div>
                </Dropdown>
              </Col>


              <Col
                xs={{ span: 6 }}
                sm={{ span: 4 }}
                style={{ textAlign: 'center', height: 30 }}
                className="optionButton"
              >

                <Dropdown
                  trigger={['click']}
                >

                  <div className="WillNotOpenPostDiv" style={{ width: '100%', height: '100%', paddingTop: 2 }}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>

                </Dropdown>
              </Col>

              {
                false
                  ? (
                    <Col
                      xs={{ span: 6 }}
                      sm={{ span: 4 }}
                      style={{ textAlign: 'center', height: 30 }}
                      className="optionButton"
                    >

                      <Dropdown
                        trigger={['click']}
                      >

                        <div className="WillNotOpenPostDiv" style={{ width: '100%', height: '100%', paddingTop: 2 }}>
                          <FontAwesomeIcon icon={faPen} />
                        </div>

                      </Dropdown>
                    </Col>
                  )
                  : null
              }

            </Row>
          </div>
        </span>
      </Card>
    </>
  );
}

Post.defaultProps = {
  loading: false,
  avatar: null,
  author: null,
  forum: null,
  time: null,
};

Post.propTypes = {
  loading: PropTypes.bool,
  avatar: PropTypes.node,
  author: PropTypes.node,
  forum: PropTypes.node,
  time: PropTypes.instanceOf(Date),
};

export default Post;
