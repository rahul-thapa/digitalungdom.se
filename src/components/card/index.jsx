import React from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 24px 48px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.1);
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${(props) => props.theme.fg};
  text-align: ${(props) => props.titleAlign}
`;

function Card({
  title, titleAlign = 'center', children, cardStyle, titleStyle, bodyStyle,
}) {
  return (
    <StyledCard
      style={cardStyle}
    >
      {(typeof title !== 'string') ? <span style={{ display: 'block' }}>{title}</span> : (
        <Header
          style={titleStyle}
          titleAlign={titleAlign}
        >
          {title}
        </Header>
      )}
      { children && (
        <div style={{ marginTop: title ? 8 : 0, ...bodyStyle }}>
          {children}
        </div>
      )}
    </StyledCard>
  );
}

Card.defaultProps = {
  title: '',
  titleAlign: 'left',
  titleStyle: {},
  cardStyle: {},
  bodyStyle: {},
  children: null,
};

Card.propTypes = {
  title: PropTypes.node,
  titleAlign: PropTypes.oneOf([
    'left',
    'right',
    'center',
    'justify',
    'initial',
    'inherit',
  ]),
  cardStyle: stylePropType,
  titleStyle: stylePropType,
  bodyStyle: stylePropType,
  children: PropTypes.node,
};

export default Card;
