import React from 'react';

import './Footer.css';
import GitHubLogo from '@/assets/svg/github.svg';
import RsSchoolLogo from '@/assets/svg/rss.svg';
// import Avatar from '@mui/material/Avatar';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container footer-container">

        <div className="footer-left">

          <a className="footer-github-link"
            href="https://github.com/demmi"
            target="_blank" rel="noreferrer">
              <div className="author">
                <GitHubLogo fill="#ffffff" height={20} width={20} viewBox={'0 0 400 400'} />
                <div className="author-name">demmi</div>
              </div>
          </a>


          <a className="footer-github-link"
            href="https://github.com/sergioivanov008"
            target="_blank" rel="noreferrer">
              <div className="author">
                <GitHubLogo fill="#ffffff" height={20} width={20} viewBox={'0 0 400 400'} />
                <div className="author-name">sergioivanov008</div>
              </div>
          </a>
        </div>

        <div className="footer-center">
          2022
        </div>

        <div className="footer-right">
          <a className="rss-logo" href="https://rs.school/js/"
            target="_blank" rel="noreferrer">
            <RsSchoolLogo height={60} width={160} viewBox={'0 0 242 90'} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;