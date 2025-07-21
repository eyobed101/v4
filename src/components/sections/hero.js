import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 0 10px;
  }

  h1 {
    margin: 0 0 20px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
  }

  .big-heading {
    margin: 0;
    line-height: 1.1;
  }

  h2.big-heading {
    font-size: clamp(40px, 8vw, 80px);
    color: var(--lightest-slate);
  }

  h3.big-heading {
    margin-top: 10px;
    font-size: clamp(20px, 4vw, 40px);
    color: var(--slate);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    color: var(--slate);
  }

  a {
    ${({ theme }) => theme.mixins.link};
    color: var(--green);

    &:hover {
      text-decoration: underline;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px;
  }

  .hero-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    background: linear-gradient(to bottom right, rgba(100, 255, 218, 0.07), transparent);
    z-index: -1;
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
    opacity: 0.5;

    @media (max-width: 768px) {
      width: 60%;
      opacity: 0.3;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Eyobed Elias.</h2>;
  const three = <h3 className="big-heading">I build secure digital experiences.</h3>;
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
    <StyledHeroSection id="hero">
      <div className="hero-bg" />

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
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
