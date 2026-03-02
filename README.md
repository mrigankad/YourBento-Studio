<div align="center">
  <img src="public/favicon.svg" alt="YourBento Studio Logo" width="120" onerror="this.src='https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg'" />

  # 🍱 YourBento Studio

  **The ultimate visual layout builder and multi-framework code export engine.** <br>
  Bridge the gap between design tools and production-grade frontend code.

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

  [Read PRD](./PRD.md) • [View Plan](./PLAN.md)
</div>

---

## 🌟 Introduction

**YourBento Studio** fills the gap between visual design tools, developer-focused code generators, and layout-specific builders. It combines deep visual editing, production-ready export without ecosystem lock-in, and a beautifully seamless user experience.

Whether you are a **Frontend Developer** prototyping a new dashboard, a **Designer** wanting to hand off real code, or an **Indie Hacker** rapidly iterating on a landing page, YourBento Studio gives you the power to visually build stunning Bento grids and export them instantly into clean, dependency-free code.

---

## ✨ Key Features

### 🎨 Visual Grid Engine
- **Data-driven CSS Grid**: Dynamic `grid-column: span N` & `grid-row: span N`.
- **Rich Card Editing**: Polymorphic card rendering, inline text editing, resize controls, built-in SVG icons, and Lottie animations.
- **Drag & Drop**: Native HTML5 Drag & Drop structural reordering.
- **Responsive Previews**: Switch instantly between Desktop (4 cols), Tablet (2 cols), and Mobile (1 col) views.

### 🎭 Theme & Style Engine
- **Effortless Styling**: Apply themes globally via CSS variables directly on the `<html>` root.
- **4 Vibrant Palettes**: *Candy*, *Monotone*, *Dark*, and *Pastel*.
- **3 Structural Styles**: *Neo-Brutalism*, *Glassmorphism*, and *Minimal Flat*.
- **Customization**: Fine-tune with a built-in custom theme editor.

### 🚀 Multi-Format Export Engine
Export clean, lint-free, dependency-free code in your stack of choice:
- **React + CSS**
- **Vue SFC**
- **Vanilla HTML / CSS**
- **Tailwind JSX**
- **JSON Structure**

### 💾 Persistence & Collaboration
- **Auto-Save**: Deep LocalStorage integration immediately saves every mutation.
- **History Management**: Robust `Undo` (Ctrl+Z) & `Redo` (Ctrl+Shift+Z) covering all card and grid mutations.
- **Share via URL**: Base64 encoded stateless sharing to collaborate with ZERO backend required.
- **Template Library**: Kickstart projects with pre-built Dashboard, Portfolio, and Admin Panel templates.

---

## 🛠️ Quick Start

Clone down this repository and you will be building beautiful grids in seconds.

```bash
# Clone the repository
git clone https://github.com/yourusername/bento.git

# Navigate to the project directory
cd bento

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🏗️ Architecture Stack

We strictly maintain a minimal footprint to guarantee blazing fast load times and clean output.

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Pure CSS + CSS Variables (No lock-in!)
- **Animations**: [Lottie](https://lottiefiles.com/)
- **Icons**: Custom inline SVG registry

---

## 🗺️ Roadmap

We're aggressively building towards MVP and beyond!

- ✅ Visual Grid Engine & Styling
- ✅ Multi-format Export (React, HTML, Vue, CSS, JSON)
- ✅ LocalStorage & History (Undo/Redo)
- ✅ Templates & Responsive Preview
- ✅ URL Sharing
- 🔲 Download Project as ZIP
- 🔲 Performance Optimization & Accessibility Audit

*For a full breakdown of the progress, check out [PLAN.md](./PLAN.md) and our original [PRD.md](./PRD.md).*

---

<div align="center">
  Built with ❤️ by the YourBento Studio team. <br>
  Empowering the next generation of visual layout builders.
</div>
