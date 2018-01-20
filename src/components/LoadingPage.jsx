import React from 'react';

const styles = {
  loginBox: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  loginCenter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    WebkitBoxPack: 'center',
    MozBoxPack: 'center',
    MsFlexPack: 'center',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    MozBoxAlign: 'center',
    MsFlexAlign: 'center',
    WebkitAlignItems: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loadingImage: {
    display: 'block',
    clear: 'both',
  },
  loadingText: {
    display: 'block',
    clear: 'both',
  },
};

export default function LoadingPage(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return (
        <div style={styles.loginBox}>
          <div style={styles.loginCenter}>
            <img
              src="/images/logo.min.svg"
              alt="logo"
              role="presentation"
              style={styles.loadingImage}
            />
            <div style={styles.loadingImage}>Loading...</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}
