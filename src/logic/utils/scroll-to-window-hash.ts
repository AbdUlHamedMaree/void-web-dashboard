export const scrollToWindowHash = () => {
  const hashId = window.location.hash;
  if (!hashId) return;
  const element = document.querySelector(hashId);
  if (!element) return;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};
