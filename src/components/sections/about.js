import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 60px;
    align-items: start; /* Changed to align items at top */

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  .about-content {
    p {
      margin-bottom: 1.5rem;
      line-height: 1.6;
      color: var(--light-slate);
    }

    a {
      ${({ theme }) => theme.mixins.link};
      font-weight: 500;
    }

    .highlight {
      color: var(--green);
      font-weight: 500;
    }
  }

  .skills-container {
    margin-top: 2rem;
  }

  .skills-group {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .skills-title {
    display: inline-block;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    color: var(--green);
    margin-bottom: 1rem;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--green-tint);
  }

  .skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(140px, 1fr));
    }
  }

  .skill-item {
    position: relative;
    padding-left: 24px;
    margin-bottom: 12px;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    color: var(--slate);
    transition: var(--transition);

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--green);
      font-size: var(--fz-md);
      line-height: 1;
    }

    &:hover {
      color: var(--green);
      transform: translateX(5px);
    }
  }
`;

const StyledPic = styled.div`
  position: sticky;
  top: 100px; /* Adjust this value based on your header height */
  max-width: 320px;
  margin-left: auto;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    margin: 40px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius-lg);
    background-color: var(--green);
    transition: var(--transition);
    overflow: hidden;

    &:hover {
      transform: translate(-8px, -8px);
      box-shadow: 8px 8px 0 var(--green-tint);

      .img {
        filter: none;
      }

      &:after {
        transform: translate(12px, 12px);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius-lg);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition-long);
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid var(--green);
      border-radius: var(--border-radius-lg);
      top: 20px;
      left: 20px;
      z-index: -1;
      transition: var(--transition-long);
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'PHP'],
    },
    {
      title: 'Frontend',
      items: ['React.js', 'Next.js', 'React Native'],
    },
    {
      title: 'Backend',
      items: ['Node.js (Express/NestJS)', 'Laravel', 'Flask'],
    },
    {
      title: 'Databases',
      items: ['MongoDB', 'MySQL', 'PostgreSQL', 'PrismaORM'],
    },
    {
      title: 'DevOps',
      items: ['RabbitMQ', 'Docker', 'CI/CD', 'AWS'],
    },
    {
      title: 'Security',
      items: ['HMAC Auth', 'OAuth 2.0', 'JWT'],
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">
        <span className="numbered-prefix">01. </span>
        About Me
      </h2>

      <div className="inner">
        <StyledText>
          <div className="about-content">
            <p>
              Hello! I’m Eyobed—a developer who crafts digital experiences with purpose. My
              fascination began when I first merged logic and creativity through code. Today, I
              build full-stack applications that balance elegant interfaces with resilient backends,
              fueled by a love for problem-solving and a drive to make technology meaningful.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://insa.gov.et/">national cybersecurity agency</a>,{' '}
              <a href="https://tripways.com.et/">a start-up</a>,{' '}
              <a href="https://www.apple.com/">a huge corporation</a>, and{' '}
              <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences.
            </p>

            <p>Here are some technologies I work with:</p>
          </div>

          <div className="skills-container">
            {skillCategories.map((category, index) => (
              <div key={index} className="skills-group">
                <h4 className="skills-title">{category.title}</h4>
                <ul className="skills-list">
                  {category.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="skill-item">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={600}
              quality={100}
              formats={['WEBP', 'AVIF']}
              alt="Eyobed Elias - Full Stack Developer"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
