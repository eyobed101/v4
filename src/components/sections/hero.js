import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

// Keyframe animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.3); }
  50% { text-shadow: 0 0 15px rgba(100, 255, 218, 0.6); }
  100% { text-shadow: 0 0 5px rgba(100, 255, 218, 0.3); }
`;

const subtleWave = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 10%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: linear-gradient(to bottom, var(--navy) 0%, rgba(10, 25, 47, 0.9) 100%);

  @media (max-width: 768px) {
    padding: 0 5%;
  }

  h1 {
    margin: 0 0 20px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    opacity: 0;
    transform: translateY(20px);
    animation: ${textGlow} 4s ease-in-out infinite;
  }

  .big-heading {
    margin: 0;
    line-height: 1.1;
    opacity: 0;
    transform: translateY(20px);
    animation: ${subtleWave} 6s ease-in-out infinite;
  }

  h2.big-heading {
    font-size: clamp(40px, 8vw, 80px);
    color: var(--lightest-slate);
    animation: ${textGlow} 5s ease-in-out infinite, ${subtleWave} 7s ease-in-out infinite;
  }

  h3.big-heading {
    margin-top: 10px;
    font-size: clamp(20px, 4vw, 40px);
    color: var(--slate);
    font-weight: 500;
    animation: ${textGlow} 6s ease-in-out infinite, ${subtleWave} 8s ease-in-out infinite;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    color: var(--slate);
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(20px) translateX(5px);
    }
  }

  a {
    color: var(--green);
    transition: all 0.3s ease;

    &:hover {
      text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.3s ease;
    animation: ${textGlow} 4s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.4), transparent);
      transition: 0.5s;
      z-index: -1;
    }

    &:hover {
      transform: translateY(0) scale(1.05);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0) scale(0.95);
    }
  }

  .floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;

    div {
      position: absolute;
      border-radius: 50%;
      background: rgba(100, 255, 218, 0.05);
      filter: blur(40px);
      animation: ${floatAnimation} 15s infinite ease-in-out;

      &:nth-child(1) {
        width: 200px;
        height: 200px;
        top: 20%;
        left: 10%;
        animation-duration: 20s;
      }

      &:nth-child(2) {
        width: 150px;
        height: 150px;
        top: 60%;
        left: 70%;
        animation-duration: 15s;
        animation-delay: 2s;
      }

      &:nth-child(3) {
        width: 100px;
        height: 100px;
        top: 30%;
        left: 80%;
        animation-duration: 25s;
        animation-delay: 4s;
      }
    }
  }

  .animated-text {
    display: inline-block;
    position: relative;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -5px;
      left: 0;
      background: var(--green);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    &:hover {
      text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);

      &::after {
        transform: scaleX(1);
      }
    }
  }

  &.active {
    h1,
    .big-heading,
    p,
    .email-link {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
      if (heroRef.current) {
        heroRef.current.classList.add('active');
      }
    }, navDelay);

    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = (
    <h2 className="big-heading">
      <span className="animated-text">Eyobed Elias.</span>
    </h2>
  );
  const three = (
    <h3 className="big-heading">
      <span className="animated-text">I build secure digital experiences.</span>
    </h3>
  );
  const four = (
    <p>
      I'm a <strong>software engineer</strong> and <strong>CTO</strong> specializing in building
      secure, scalable systems across multiple platforms. Currently leading technical innovation at{' '}
      <a href="https://tripways.com.et/" target="_blank" rel="noreferrer">
        Tripways
      </a>{' '}
      while contributing to national cybersecurity at{' '}
      <a href="https://insa.gov.et/" target="_blank" rel="noreferrer">
        INSA
      </a>
      .
    </p>
  );
  const five = (
    <a className="email-link" href="mailto:your-email@example.com" target="_blank" rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection id="hero" ref={heroRef}>
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
      </div>

      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={loaderDelay}
                mountOnEnter
                unmountOnExit>
                <div
                  style={{
                    transitionDelay: `${i + 1}00ms`,
                    willChange: 'transform, opacity',
                  }}>
                  {item}
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
