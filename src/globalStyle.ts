import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
/* colors */
:root {
--orange: #DC481E;
--dark-orange: #b93d19;
--black: #121212;
--white: #fff;
--light-gray: #5c5c5c;
--lighter-gray: #424242;
--gray: #353535;
--red: #cf6679;
--primary: var(--gray);
--secondary: var(--white);
--accent: var(--orange);
--dark-accent: var(--dark-orange);
}

 body {
    background-color: var(--light-gray);
    color: var(--secondary);
    font-family: 'Helvetica';
    overflow: overlay;

  }

  *,
*::before,
*::after {
  box-sizing: border-box;
}

button {
  &:hover {
    cursor: pointer;
  }
  padding: 0;
}

input[type=text]{
  padding: 0;
  margin: 0;
}

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
input,
figure,
blockquote,
dl,
dd {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul, ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  text-rendering: optimizeSpeed;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  /* background-color: var(--light-gray); */
  /* color: var(--secondary); */
  
}
::-webkit-scrollbar-track {
  background: var(--primary) 
}

::-webkit-scrollbar-thumb {
  background: var(--light-gray) 
}
  
.modal-open {
   overflow: hidden;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
