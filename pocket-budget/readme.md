# Pocket Budget

A simple budget tracker for students, built for the CSK Mobile Development Hackathon Challenge.



## The problem

Many students run out of money before their next allowance or HELB payment. It is hard to know how much you can safely spend each day.

## The solution

Pocket Budget lets you enter the money you have and the days until your next allowance. It then tells you your **safe daily spend** and updates it every time you record an expense. If you overspend, the numbers turn red.

## Features

- Set your budget and the number of days left
- Add expenses with an amount, category and note
- Delete expenses
- Filter expenses by category (food, transport, airtime, rent, savings, other)
- Live remaining balance and safe daily spend
- Red warning when the balance goes below zero
- Data is saved in the browser, so it is still there after a refresh
- Mobile-friendly layout

## Screenshots

![Pocket Budget screenshot](pocket-budget\screenshots)

## Built with

- HTML
- JavaScript
- TypeScript
- Vite (development tool)

No backend is used. All data is stored in the browser with `localStorage`.

## How to run it

```bash
git clone https://github.com/YOUR-USERNAME/pocket-budget.git
cd pocket-budget
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Project structure

- `index.html`: the page layout
- `src/main.ts`: the app logic (add, delete, filter, calculate, draw the screen)
- `src/storage.ts`: saving and loading data from `localStorage`

## How it works

User action (add, delete, save budget) → update the data → save it → redraw the screen.

## Author

Jonathan Kipkoech, Computer Society of Kirinyaga (CSK)