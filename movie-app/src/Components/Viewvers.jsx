import React from 'react';
import styled from 'styled-components'; // ✅ correct import

function Viewvers() {
    return (
        <Container>
            <Wrap>
                <img src='/images/viewers-disney.png' alt='' />
                <video autoPlay loop playsInline muted>
                    <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
                </video>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-marvel.png' alt='' />
                <video autoPlay loop playsInline muted>
                    <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
                </video>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-pixar.png' alt='' />
                <video autoPlay loop playsInline muted>
                    <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
                </video>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-national.png' alt='' />
                <video autoPlay loop playsInline muted>
                    <source src="/videos/1564676296-national-geographic.mp4" type="video/mp4" />
                </video>
            </Wrap>
            <Wrap>
                <img src='/images/viewers-starwars.png' alt='' />
                <video autoPlay loop playsInline muted>
                    <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
                </video>
            </Wrap>
        </Container>
    );
}

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 120px 26px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media (max-width: 992px) {
    padding: 20px 40px;
    grid-gap: 20px;
  }

  @media (max-width: 600px) {
    padding: 20px 20px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 15px;
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
              rgba(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249,249,249,0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45,0.2);

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    inset: 0;
    display: block;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    z-index: 1;
    top: 0;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
                rgba(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249,249,249,0.8);

    video {
      opacity: 1;
    }
  }
`;

export default Viewvers;
