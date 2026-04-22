# 📅 Evaluation Date Calculator

> A smart, responsive web app that automatically calculates employee evaluation milestones based on job title and start date — skipping non-working days defined in the school district calendar.

---

## 🌟 Overview

The **Evaluation Date Calculator** is built for HR staff and school district administrators to instantly determine the correct evaluation dates for employees. Instead of manually counting working days on a calendar, this tool does all the heavy lifting — automatically skipping blocked-out dates (non-working days marked as **X** on the district calendar) while correctly counting holidays (**H**) and vacation days (**V**).

---

## ✨ Features

- 🎯 **Instant Calculation** — Enter a start date and get all 3 evaluation milestones immediately
- 🏢 **Job Title Support** — Different evaluation rules per job title (e.g., Noon Duty Aide, 12 Month Employees)
- 📆 **Multi-Year Calendar** — Supports academic years 2025/2026 and 2026/2027
- 🚫 **Smart Blackout Handling** — Only skips truly non-working (X-marked) dates, not holidays or vacation days
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ⚡ **Lightning Fast** — Built with Vite for near-instant load and hot reload
- 🎨 **Clean Modern UI** — Polished interface built with Tailwind CSS

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Lucide React](https://lucide.dev/) | Icons |
| JavaScript (ES Modules) | Core logic |

---

## 📁 Project Structure

```
eval-date-calculator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── utils/
│   │   └── dateCalculations.js   # Core evaluation date logic
│   ├── calendars.json            # Blackout dates per job title & year
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Component styles
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed before running the project:

- **Node.js** v18 or higher → [Download here](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)

Verify your installation:
```bash
node -v
npm -v
```

---

### Installation & Running Locally

**Step 1 — Clone the repository**
```bash
git clone https://github.com/your-username/eval-date-calculator.git
```

**Step 2 — Navigate into the project folder**
```bash
cd eval-date-calculator
```

**Step 3 — Install dependencies**
```bash
npm install
```

**Step 4 — Start the development server**
```bash
npm run dev
```

**Step 5 — Open in your browser**
```
http://localhost:5173
```

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build the app for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🧠 How It Works

### Evaluation Milestones
For each employee, the calculator computes **3 evaluation dates** based on their start date:

| Evaluation | Rule |
|---|---|
| 1st Evaluation | 2 months from start date |
| 2nd Evaluation | 5 months from start date |
| 3rd Evaluation | 6 months + 1 day from start date |

### Blackout Date Logic
The app reads from `calendars.json` which contains a `blackouts` array per job title. These are dates marked as **X** (non-working days) on the district calendar.

```
Calendar Date Types:
  X  →  Non-working day     →  BLOCKED  (skipped in calculation)
  H  →  Holiday             →  COUNTED  (not a blackout)
  V  →  Vacation day        →  COUNTED  (not a blackout)
```

When a calculated milestone lands on or is pushed past a blocked date, the app automatically advances the date forward to the next valid working day.

### Date Calculation Flow

```
Start Date
    │
    ▼
Add months (2, 5, or 6+1 day)
    │
    ▼
Count blackout dates between start → target
    │
    ▼
Push target forward by blackout count
    │
    ▼
Adjust if result lands on weekend or blackout
    │
    ▼
Final Evaluation Date ✅
```

---

## 📊 Calendar Data (`calendars.json`)

The calendar data is structured as follows:

```json
{
  "Job Title Name": {
    "years": ["2025/2026", "2026/2027"],
    "maxDate": "2027-06-30",
    "blackouts": [
      "MM/DD/YYYY",
      ...
    ]
  }
}
```

> ⚠️ **Important:** Only dates marked with **X** (non-working days) on the official district calendar should be in the `blackouts` array. Holidays (H) and vacation days (V) should NOT be included.

### Currently Supported Job Titles

| Job Title | Supported Years |
|---|---|
| Noon Duty Aide | 2025/2026, 2026/2027 |
| 12 Month Employees | 2025/2026 |

---

## 🔧 Adding a New Job Title

To add a new job title to the calculator:

1. Open `src/calendars.json`
2. Add a new entry following this structure:

```json
"New Job Title": {
  "years": ["2025/2026"],
  "maxDate": "2026-06-30",
  "blackouts": [
    "07/04/2025",
    "09/01/2025"
  ]
}
```

3. Save the file — the app will automatically pick up the new job title in the dropdown.

> 📌 Only include **X-marked** (non-working) dates in the `blackouts` array.

---

## 📦 Building for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` folder. You can then deploy it to any static hosting platform:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 🐛 Troubleshooting

**`'vite' is not recognized` error**
```bash
# Delete node_modules and reinstall
rmdir /s /q node_modules     # Windows
rm -rf node_modules          # Mac/Linux

npm cache clean --force
npm install
npm run dev
```

**Port 5173 already in use**
Vite will automatically switch to the next available port (5174, 5175, etc.). Check your terminal output for the correct URL.

**Calculation exceeds calendar data error**
This means the calculated evaluation date goes beyond the `maxDate` set in `calendars.json` for that job title. Either add the next academic year's data or adjust the start date.

---

## 📄 License

This project is private and intended for internal use by the school district HR department.

---

## 👤 Author

Built and maintained by **Anas**

---

> 💡 **Tip:** To update blackout dates for a new school year, simply edit the `blackouts` array in `src/calendars.json` — no code changes required.
