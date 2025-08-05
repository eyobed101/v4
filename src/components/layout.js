import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

// Vanta background styles
const VantaBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: transparent;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  // Handle Vanta.js background
  useEffect(() => {
    // if (!isHome || isLoading) {return;};
    if (!isHome || isLoading) {
      return;
    }

    let isMounted = true;
    let threeScript;
    let vantaScript;

    const initVanta = () => {
      if (!isMounted || !window.VANTA || !vantaRef.current) {
        return;
      }

      // Clean up previous effect if exists
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3f4cff,
        backgroundColor: '#0a192f', // Dark background to match effect
      });
    };

    if (window.VANTA) {
      initVanta();
    } else {
      // Load Three.js if needed
      if (!window.THREE) {
        threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
        threeScript.async = true;
        threeScript.onload = () => {
          if (!isMounted) {
            // If component is unmounted, do not initialize Vanta
          }
          loadVantaScript();
        };
        document.head.appendChild(threeScript);
      } else {
        loadVantaScript();
      }
    }

    function loadVantaScript() {
      if (window.VANTA) {
        initVanta();
        return;
      }

      vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
      vantaScript.async = true;
      vantaScript.onload = initVanta;
      document.head.appendChild(vantaScript);
    }

    // Handle resize
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);

      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      // Clean up dynamically added scripts
      if (threeScript && document.head.contains(threeScript)) {
        document.head.removeChild(threeScript);
      }
      if (vantaScript && document.head.contains(vantaScript)) {
        document.head.removeChild(vantaScript);
      }
    };
  }, [isHome, isLoading]);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      // intentionally left blank
    }

    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <>
              {/* Vanta.js background */}
              {isHome && <VantaBackground ref={vantaRef} />}

              <StyledContent>
                <Nav isHome={isHome} />
                <Social isHome={isHome} />
                <Email isHome={isHome} />

                <div id="content">
                  {children}
                  <Footer />
                </div>
              </StyledContent>
            </>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
