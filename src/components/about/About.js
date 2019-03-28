import React from 'react';
import './About.scss';
import kristin from '../../assets/RoboDog.jpg';
import paige from '../../assets/cakeIsALie.jpg';
import aaron from '../../assets/aaron-robot.png';
import github from '../../assets/github.png';
import cari from '../../assets/robotcari.jpg';

export default function About() {
    return (
      <>
        <main className={'aboutWrapper'}>
          <h1>Q Bot Team</h1>
          <p>For our final project in Alchemy career track we built a slackbot which adds student questions to a firestore collection</p>
          <p>Built in 4 days using Firebase, ReactJS, Jest, Enzyme, React Hooks, Cloud functions, and Firebase OAuth.</p>
          <div className={'imageWrapper'}>
            <div>
              <img className={'aboutImages'} src={kristin} alt='Kristin robot'/>
              <p>Kristin</p>
              <a href='https://www.github.com/kristinhortsch' target='_blank' rel='noopener noreferrer'><img className={'github'} src={github} alt='github' /></a>
            </div>

            <div>
              <img className={'aboutImages aboutOffCenter'} src={paige} alt='Paige robot'/>
              <p>Paige</p>
              <a href='https://www.github.com/paigeegorry' target='_blank' rel='noopener noreferrer'><img className={'github'} src={github} alt='github' /></a>
            </div>

            <div>
              <img className={'aboutImages'} src={aaron} alt='Aaron robot'/>
              <p>Aaron</p>
              <a href='https://www.github.com/AaronD87' target='_blank' rel='noopener noreferrer'><img className={'github'} src={github} alt='github' /></a>
            </div>

            <div>
              <img className={'aboutImages aboutOffCenter'} src={cari} alt='Cari robot'/>
              <p>Cari</p>
              <a href='https://www.github.com/caripizza' target='_blank' rel='noopener noreferrer'><img className={'github'} src={github} alt='github' /></a>
            </div>
          </div>
        </main>
      </>
    );
}
