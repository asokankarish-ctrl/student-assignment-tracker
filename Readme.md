# Student Assignment Tracker

A browser-based application that helps students track coursework,
deadlines, and completion status.

## Features

- Add assignments with a title, subject, and deadline.
- Mark assignments as completed or pending.
- Delete assignments.
- Filter by all, pending, or completed.
- View total, pending, and completed counts.
- Highlight overdue unfinished assignments.
- Save assignments between visits using localStorage.
- Sort assignments by earliest or latest deadline.
- Edit assignment details or cancel changes.

## Technologies

- HTML
- CSS
- JavaScript
- Browser localStorage

## How to Run

1. Download or clone this repository.
2. Open index.html in a modern browser.
3. Add an assignment using the form.

For consistent localStorage behaviour, run the project through
a local development server. Storage behaviour with directly
opened files can vary between browsers.

## How It Works

Assignments are stored as objects in a JavaScript array.

When an assignment is added, changed, or deleted, the application:
1. Updates the array.
2. Saves the data to localStorage as JSON.
3. Renders the updated assignment list and summary.

Filtering changes which assignments are displayed without
removing them from the saved data.

## Limitations

- Data is stored only in the current browser and site.
- Assignments do not sync across devices.
- Clearing browser site data removes saved assignments.
- Overdue indicators update when the list renders, including
  when the page is refreshed.

## Learning Context

Built as a guided learning project with AI assistance to practise
HTML, CSS, JavaScript, DOM manipulation, events, and browser storage.

## Possible Improvements

- Edit existing assignments.
- Sort assignments by deadline.
- Export and import assignments.
