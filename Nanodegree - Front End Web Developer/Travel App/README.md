# Travel Planner

This is the graduation project for the Front End developer Nanodegree.

## Instructions

1. Navigate to the project root.
1. Run `npm install -D`.
1. If you want the optimizations and Google Workbox integration run `npm run build-prod`. If you want the development environment and jest run `npm run build-dev`.
1. Run `npm start` for the normal express server. Run `npm run start-dev-server` for the webpack dev server.
1. In your browser, navigate to `localhost:5000` for the express server, or navigate to `localhost:5010` for the webpack dev server.
1. For testing, run `npm test`.

## Things I choose from the (Extend your Project Further) section

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow the user to remove the trip. (The reset button)

## Remarks

- The way I categorized the npm packages in the `package.json` reflects the situation, where the website is developed **and built** in the development environment, then commited to git. In the production environment **no building takes place**. We just pull all changes **including** the `dist` folder and start the server.