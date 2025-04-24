import React from 'react';
import styled from 'styled-components';

function ReviewBtn({ onClick }) {
  return (
    <Container>
      <Wrap>
        <StyledButton onClick={onClick}>Add Review</StyledButton>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 60px;
  right: 20px;
  z-index: 1000;
`;

const Wrap = styled.div`
  color: white;
`;

const StyledButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #e63946;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default ReviewBtn;
