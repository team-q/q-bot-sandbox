import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
import kristin from '../../assets/kristinhortsch.jpg';
import paige from '../../assets/paigegorry.png';
import aaron from '../../assets/aarondennis.jpg';
import github from '../../assets/github.png';
import cari from '../../assets/caripalazzolo.jpg';

export default function About() {
    return (
      <>
        <main className={'aboutWrapper'}>
          <h1>Q Bot Team</h1>
          <p>For our final project in Alchemy career track, we built a Slack bot that adds student questions to Cloud Firestore collections.</p>
          <p>Built in 4 days using Slack's Events & Conversations API's, Cloud Firestore, Firebase OAuth (GitHub + Google), ReactJS, React Hooks, Google Cloud Functions, Moment.js, Sass, continuous deployment via Travis-CI, and snapshot tests with Jest and Enzyme.</p>
          <div className={'imageWrapper'}>
            <div>
              <img className={'aboutImages'} src={kristin} alt='Kristin robot'/>
              <p>Kristin</p>
              <a href='https://www.github.com/kristinhortsch' target='_blank' rel='noopener noreferrer'>
                <img className={'github'} src={github} alt='github' />
              </a>
              <p>
                Kristin is a FullStack JavaScript developer with a passion for taking on new challenges and figuring out different ways to solve them. While not happily coding away, Kristin is an avid laugher, stalker of cats, coffee addict, and dedicated sports fan!
              </p>
            </div>

            <div>
              <img className={'aboutImages aboutOffCenter'} src={paige} alt='Paige robot'/>
              <p>Paige</p>
              <a href='https://www.github.com/paigeegorry' target='_blank' rel='noopener noreferrer'>
                <img className={'github'} src={github} alt='github' />
              </a>
              <p>
                Paige is a full stack JavaScript developer with a background in community building both on and offline. She enjoyed working on this project because of the opportunity to learn new tech, which meant lots of debugging! While coding, she enjoys circular dependencies, unhandled promise rejections, and unexpected tokens in JSON at position 0.
              </p>
            </div>

            <div>
              <img className={'aboutImages'} src={aaron} alt='Aaron'/>
              <p>Aaron</p>
              <a href='https://www.github.com/AaronD87' target='_blank' rel='noopener noreferrer'>
                <img className={'github'} src={github} alt='github' />
              </a>
              <p>
                Aaron is a full-stack Javascript developer with a focus on the front end. While not pushing pixels or coding away he is an avid climber, enthusiastic traveller, and life long learner.
              </p>
            </div>

            <div>
              <img className={'aboutImages aboutOffCenter'} src={cari} alt='Cari robot'/>
              <p>Cari</p>
              <a href='https://www.github.com/caripizza' target='_blank' rel='noopener noreferrer'>
                <img className={'github'} src={github} alt='github' />
              </a>
              <p>
                Cari is a full-stack JavaScript developer with a career rooted in visual art and graphic design. She brings a decade of experience in nonprofit mentorship and music performance and loves working with diverse groups on purpose-driven projects.
              </p>
            </div>
          </div>

          <br/>
          <br/>
          <Link to="/">Back</Link>
        </main>
      </>
    );
}
