# Trivia🎯 (TriviaDart)

<div align="center">

![trivia-dart-image](/src/assets/triviadart.png)<br>

<a href="https://triviadart.com" target="_blank"><img src="public/pwa.svg" height="45"></a><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6cb91f4b-93fe-4ac1-b7e0-417c39c7a2c4/deploy-status)](https://app.netlify.com/sites/triviadart/deploys)

</div>

## Overview

TriviaDart is a simple Trivia web application that utilizes both the [Open Trivia DB ](https://opentdb.com/) and [The Trivia API](https://the-trivia-api.com/), which both offer generous free API usage. TriviaDart also has an in-house API that has over 45,000 trivia questions. Currently, there are no options available for these questions, but this will be added in the future. The in-house API utilizes Supabase.

TriviaDart allows you to select one of the above mentioned APIs, a category (`Any` by default), and the ability to show multiple choice options if you are stuck!

Themes! There are many themes and fonts available for you to customize TriviaDart to your preference. Simply click/press on the settings icon in the bottom right of the screen.

## Install

You are able to install TriviaDart as a Progressive Web Application (PWA) on any modern device. This will allow the application to be "installed" and appear like any other application on your phone/tablet/desktop. To install TriviaDart as a PWA, follow these steps:

### Desktop:

1. Go to [TriviaDart](https://triviadart.com) in your browser.
2. Depending on your browser, the next steps may change.
3. Click on the "install" icon in the URL bar (often at the far-right end next to the share or favorite buttons).
4. More information can be found in the [Mozilla Developer Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#installation_from_the_web).

### Mobile:

1. Go to [TriviaDart](https://triviadart.com) in your browser.
2. Depending on your browser, the next steps may change.
3. If you are on iOS Safari, click the "Share" button, then click "Add to Home Screen".
4. If you are on Android, click on the settings button, then click "Install".

Note: Chromium-based browsers work best for installation of PWAs.

## Development

1. Clone this repo locally: `git clone https://github.com/tpbnick/Trivia-Dart.git`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start up the application.

### Hosting Your Own TriviaDart Source

If you want to use Supabase to run your own trivia database, you can create a database and a `.env` file in the root of this project. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_APIKEY` to the `.env` for the SupaBase.ts file to load correctly. The TriviaDart database is setup with the table name `questions`, and the following columns:

| Column Name         | Data Type |
| ------------------- | --------- |
| `id`                | int4      |
| `category`          | text      |
| `question`          | text      |
| `answer`            | text      |
| `incorrect_answers` | text[]    |

The data inside the `incorrect_answers` is formatted as follows (Note: there must be three wrong answers for the Trivia.tsx component to render correctly):

```json
["wrong answer 1", "wrong answer 2", "wrong answer 3"]
```

If you do NOT want to host your own TriviaDart source, see [How to Remove TriviaDart Source](#how-to-remove-triviadart-source).

### Free Hosting

I personally host this web application on [Netlify](https://netlify.com), which will automatically build any time I make a push/merge to the `master` branch. Make sure to add the environment variables to your deployments on your preferred hosting provider.

## Docker Deployment

TriviaDart is also deployable using Docker. Simply run `docker-compose up` inside the root folder of this application, with the Docker service running on your machine, and it should stand up a TriviaDart container running on port 3000. If you want to change this port, you can edit the docker-compose.yml file to use whichever port you want.

## How to Remove TriviaDart Source

If you don't want to see the TriviaDart source in the sources dropdown, comment out the TriviaDart source in the `TriviaSource` `const` inside the Trivia.tsx file (src/components/Trivia.tsx) and redeploy.

```ts
const TriviaSource: Record<string, string> = {
	"Open Trivia DB": "https://opentdb.com/api.php?amount=1",
	"The Trivia API": "https://the-trivia-api.com/api/questions?limit=1",
	// TriviaDart: "", <- comment out this line
};
```

You should now only see the OpenTriviaDB and The-Trivia-API sources in the source dropdown.

## Technology Used

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [VitePWA](https://github.com/vite-pwa/vite-plugin-pwa)
- [Supabase](https://supabase.com/)

## Misc.

All trivia questions provided by OpenTriviaDB and The-Trivia-API are licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
