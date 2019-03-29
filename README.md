# Q bot

**Authors**: [Kristin Hortsch](https://github.com/kristinhortsch), [Paige Gorry](https://github.com/paigeegorry), [Aaron Dennis](https://github.com/AaronD87), [Cari Palazzolo](https://github.com/caripizza)

**https://qbot.alchemycodelab.io**

## Overview
For our final project in [Alchemy](https://www.alchemycodelab.com/) career track, we built a Slack bot that adds student questions to Cloud Firestore collections.

## Architecture
Built in 4 days using Slack's Events & Conversations API's, Cloud Firestore, Firebase OAuth (GitHub + Google), ReactJS, React Hooks, Google Cloud Functions, Moment.js, Sass, continuous deployment via Travis-CI, and snapshot tests with Jest and Enzyme.

## The problem
During class, one-off questions from students are common - where diagnosing an issue can be a significant investment in TA time. We wanted to build a Slack app that allows students to add their name and concern to a TA queue (database). TA’s can login and 'claim' each concern listed in the database to orient themselves to the problems in advance, and peruse the database entries to see which students need the most help (and which topics are the most confusing).

## The idea
- Students @ mention the bot in a private class Slack channel, and the bot responds in a threaded reply confirming their question was added to the queue.
- The student’s name and their concern are then added to the database, and TA's can login to filter, sort and claim questions.
- Includes a Leaderboard for viewing stats on TA's with the most solved questions.

## Getting Started
1. Clone and download [GitHub repo](https://github.com/team-q/q-bot-sandbox)
2. Install dependencies: `npm i`
3. Run snapshot tests: `npm run test`
4. Create a Firebase project and deploy
5. Create a Slack App and Enable Events
   * Add the `helloSlack` Cloud Function trigger end point to the Slack Events Subscription Request URL
   * Subscribe to the `app_mention` Bot Event
   * Create a Bot User OAuth Access Token
     * Save token to `processQuestion` and `saveCohortName` Function ENV settings in Google Cloud Platform
   * Activate Incoming Webhooks for each private Slack channel, and add to `processQuestion` function
   * NOTE: For Slack verification, `helloSlack` will initially need to be deployed as:
     ```javascript
     exports.helloSlack = functions.https.onRequest((request, response) => {
        if(request) {
          response.status(200).send(request.body);
        } else {
          throw response.status(500);
        }
     })
     ```
6. Establish Firebase OAuth for Google/GitHub, Firestore collections
7. Deploy to Firebase hosting using Travis CI

## Previews
![Qbot](./src/assets/QbotSlackapp.png)

## License
Standard [MIT](/LICENSE.md)

## Acknowledgements
Thank you to [Ryan Mehta](https://github.com/mehtaphysical) for your brilliant guidance and support
