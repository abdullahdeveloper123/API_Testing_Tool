# ⚡ React API Testing Tool

A lightweight and user-friendly API testing tool built with **React**. Designed to help developers test HTTP requests (GET, POST, PUT, DELETE) with support for headers, parameters, body, and authentication — just like Postman, but simpler.


🔗 **Live Demo:** [https://marvelous-phoenix-0bbd1d.netlify.app/](https://marvelous-phoenix-0bbd1d.netlify.app/)

---

## ✨ Features

* 🔍 Test any public API endpoint
* 🧾 Support for GET, POST, PUT, DELETE
* 🔐 Add custom headers, parameters, and auth tokens
* 🧰 Body input with JSON support
* 📈 View response status, size, and time
* 📜 Request history (stored in browser)
* 🗃 Export history to CSV
* ❌ Delete individual or all history items
* 📱 Responsive design for mobile & desktop

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/react-api-testing-tool.git
cd react-api-testing-tool
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will run at `http://localhost:3000`

---

## 🚀 Build for Production

```bash
npm run build
```

This will generate a production-ready `build/` folder.

You can deploy the contents of `build/` to:

* [Netlify](https://netlify.com)
* [Vercel](https://vercel.com)
* [GitHub Pages](https://pages.github.com)

---

## 🛠 Technologies Used

* React (CRA)
* JavaScript (ES6+)
* CSS (custom styling, responsive design)
* HTML5

---

## 📁 Project Structure

```
/src
  /components
    ├── RequestForm.jsx
    ├── HistoryPanel.jsx
    └── ResponseDisplay.jsx
  App.jsx
  index.js
```

---

## 📤 Example Public APIs to Test

You can use these mock APIs:

* `https://jsonplaceholder.typicode.com/posts`
* `https://reqres.in/api/users`
* `https://httpbin.org/post`

---

## 📄 License

MIT License © 2025 \ Abdullah Hussain

---

## 💡 Future Ideas

* Save & reload environments (dev/staging/prod)
* Syntax highlighting in JSON body
* Dark mode toggle
* Shareable links for request setup

---

> Built for devs who love clean tools. Contributions welcome!
