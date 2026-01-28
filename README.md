# Trivia🎯 (TriviaDart)

<div align="center">

![trivia-dart-image](/src/assets/triviadart.png)<br>

<a href="https://triviadart.com" target="_blank"><img src="public/pwa.svg" height="45"></a><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6cb91f4b-93fe-4ac1-b7e0-417c39c7a2c4/deploy-status)](https://app.netlify.com/sites/triviadart/deploys)

</div>

---

## 🎯 Overview

**TriviaDart** is a modern trivia web app that lets you play with questions from:
- [Open Trivia DB](https://opentdb.com/) 🌐
- [The Trivia API](https://the-trivia-api.com/) 🌐
- (Optional) Your own Supabase-powered TriviaDart backend 🗄️

**Features:**
- 🔄 Multiple sources and categories
- ❓ Multiple choice options
- 🎨 Customizable themes and fonts
- 📱 Mobile-friendly, installable as a PWA

---

## 🚀 Quick Start

```bash
git clone https://github.com/tpbnick/Trivia-Dart.git
cd Trivia-Dart
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration

### 🛠️ Environment Variables

- `VITE_ENABLE_TRIVIADART` (default: `false`)
  - Set to `true` to enable the TriviaDart (Supabase) source.
  - Set to `false` to use only public APIs (no Supabase required).

If using your own Supabase backend, also set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_APIKEY`
- `VITE_TRIVIA_DART_APIKEY` (if needed)

Create a `.env` file in the project root and add your variables.

---

## 🚢 Deploying

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add your environment variables in the Netlify dashboard.

### 🐳 Docker 

```bash
docker-compose up
```
Or build with:
```bash
docker build --build-arg VITE_ENABLE_TRIVIADART=false .
```

---

## 🗄️ Hosting Your Own TriviaDart Source (Optional)

If you want to use your own Supabase backend:
- Set up a `questions` table with the following columns:

| Column Name         | Data Type |
| ------------------- | --------- |
| `id`                | int4      |
| `category`          | text      |
| `question`          | text      |
| `answer`            | text      |
| `incorrect_answers` | text[]    |

- The data inside the `incorrect_answers` column should be a text array, e.g.:

```json
["wrong answer 1", "wrong answer 2", "wrong answer 3"]
```

- You are free to use the `trivia.csv` file found in this repository to populate your own database. The questions inside this csv are sourced from the [OpenTriviaQA dataset](https://github.com/uberspot/OpenTriviaQA), which is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).

---

## 🛠️ Technology

- ⚛️ [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- 📝 [TypeScript](https://www.typescriptlang.org/)
- 💅 [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- 🗄️ [Supabase](https://supabase.com/) (optional)
- 📦 [VitePWA](https://github.com/vite-pwa/vite-plugin-pwa)

---

## 📜 License & Credits

- Questions from OpenTriviaDB and The-Trivia-API are licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).
- Questions from TriviaDart are sourced from the [OpenTriviaQA dataset](https://github.com/uberspot/OpenTriviaQA) and are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- TriviaDart is open source and contributions are welcome!

