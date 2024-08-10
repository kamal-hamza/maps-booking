import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import styles from './ProviderLogin.module.css';

function ProviderLogin({ logo, text, onClick }) {
    return (
        <div>
            <Button variant="primary" className={styles.login_btn} onClick={onClick}>
                <img src={logo} alt={`${text} logo`} className={styles.logo} /> {text}
            </Button>
        </div>
    );
}

ProviderLogin.propTypes = {
    logo: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ProviderLogin;