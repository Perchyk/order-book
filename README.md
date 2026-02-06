- `yarn dev` to launch the app in dev mode - dev server will be on http://localhost:5173/
- `yarn build` for prod build

Stack choice:

- Vite from default template as the fastest way to have a running app since CRA has been sunsetted
- Tried to keep dependencies to a minimum and not carry in components libraries just to e.g. show a tooltip
- Tanstack Query just because I was curious if it would be a good choice after reading this: https://tkdodo.eu/blog/using-web-sockets-with-react-query. It wasn't required in any way (like, I didn't use things like socket.io but took a library for one query...). It was mostly out of curiosity and also because it's kind of an industry standard these days.
- Tailwind because I used to like it and it's a good compromise between writing all styles by yourself and taking a full components library. I remembered why people don't like Tailwind though, readability SUFFERS. Sorry about that.
- the elements like two menus don't close on click outside, not perfect but it's a deliberate choice to use native elements as much as possible. Could add overlays with click handlers but that would distract from more important things.

The imperfect things:

- I tried to implement animation but I realized that I don't understand the business logic. From my perspective (I'm not very experienced with crypto analysis instruments), it looks like absolutely random rows are highlighted - all data is updated but only certain rows are animated. I don't know. It's not hard to add a couple of @keyframes but it's much harder to make them make sense ¯\_(ツ)\_/¯
- as we are limited to 20 entries at once, there isn't as much data as in the original component when 10+ rounding levels are chosen. I hope that's expected, not 100% sure though.
- in the real app I would've added at least a couple of browser (or "snapshot", or "visual") tests with Playwright but I felt like it's out of the scope considering the time suggested for the task.
