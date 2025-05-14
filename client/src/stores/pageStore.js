



// NOT USED CAN BE DELETED





import { writable } from 'svelte/store';

export const page = writable({
  path: window.location.pathname,
  query: window.location.search,
  hash: window.location.hash
});

// Lyt efter ændringer i browserens navigation (f.eks. tilbage-knap)
window.addEventListener('popstate', () => {
  page.set({
    path: window.location.pathname,
    query: window.location.search,
    hash: window.location.hash
  });
});
