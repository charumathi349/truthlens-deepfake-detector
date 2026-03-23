# 🔍 TruthLens — AI DeepFake Detection Platform

> Final Year CSE Project | React + Claude AI | World-class UI

![TruthLens Banner](https://img.shields.io/badge/TruthLens-DeepFake%20Detector-00f5ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Claude AI](https://img.shields.io/badge/Claude-Vision%20AI-orange?style=for-the-badge)

---

## 🎯 Project Overview

TruthLens is an AI-powered deepfake detection platform that uses **Claude Vision AI** to forensically analyze images for signs of manipulation, GAN generation, or face-swapping.

### ✨ Key Features

- 📸 **Drag & Drop Upload** — Instant image upload with preview
- 🔬 **Forensic Analysis** — 5-vector detection (GAN artifacts, facial geometry, skin texture, background blend, overall manipulation)
- 📊 **Visual Results** — Radar chart + progress bars with confidence scores
- 🚨 **Red Flag Reports** — Specific manipulation indicators listed
- 📈 **Analysis Dashboard** — Bar chart + pie chart history tracking
- 🌐 **How It Works** — Detailed explainer of the AI pipeline

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Framer Motion |
| Charts | Recharts (Radar, Bar, Pie) |
| AI Model | Claude Vision (claude-sonnet-4) |
| Icons | Lucide React |
| Fonts | Syne + JetBrains Mono |
| Styling | Pure CSS with CSS Variables |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Anthropic API Key ([get one here](https://console.anthropic.com))

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/truthlens.git
cd truthlens

# Install dependencies
npm install

# Start development server
npm start
```

### API Key Setup

The project uses Anthropic's API. In production, add a proxy server to secure your API key. For development, the key is handled by the Claude.ai environment.

---

## 📁 Project Structure

```
truthlens/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar
│   │   └── ResultCard.js      # Analysis result display
│   ├── pages/
│   │   ├── HeroPage.js        # Landing page with particle canvas
│   │   ├── DetectorPage.js    # Main upload & analysis page
│   │   ├── DashboardPage.js   # History & statistics
│   │   └── HowItWorksPage.js  # Explainer page
│   ├── App.js                 # Main app with page routing
│   ├── index.js               # Entry point
│   └── index.css              # Global styles & CSS variables
└── package.json
```

---

## 🧠 How the AI Detection Works

1. **Upload** → Image converted to Base64
2. **Preprocessing** → Normalized for AI input
3. **Claude Vision Analysis** → Multi-dimensional forensic scan
4. **Score Generation** → JSON output with 5 detection vectors
5. **Verdict** → REAL / FAKE / SUSPICIOUS with confidence %

### Detection Vectors
- 🔴 **GAN Artifacts** — Statistical noise from generative models
- 🟠 **Facial Geometry** — Biological symmetry violations
- 🟡 **Skin Texture** — Hyper-smooth or tiled patterns
- 🔵 **Background Blend** — Boundary seams and lighting mismatches
- 🟣 **Overall Manipulation** — Combined manipulation probability

---

## 📸 Screenshots

| Landing Page | Detection | Results | Dashboard |
|---|---|---|---|
| Particle canvas hero | Drag & drop upload | Radar + score bars | Charts + history |

---

## ⚠️ Disclaimer

TruthLens is an academic project. AI analysis should not be used as the sole basis for legal or criminal determinations. Always combine with human expert review.

---

## 👨‍💻 Author

**Final Year CSE Student Project**  
Built with ❤️ using React + Claude AI

---

## 📄 License

MIT License — Free to use for educational purposes.
