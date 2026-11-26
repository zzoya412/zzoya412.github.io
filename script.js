
const cover = document.querySelector('.cover-section');

const whiteTitle = document.querySelector('.intro__title-line--white');
const accentTitle = document.querySelector('.intro__title-line--accent');
const definitionTitle = document.querySelector('.definition__title');
const description = document.querySelector('.definition__description');

function updateCover() {
  if (!cover) return;

  const rect = cover.getBoundingClientRect();
  const distance = cover.offsetHeight - window.innerHeight;

  const progress = Math.max(
    0,
    Math.min(1, -rect.top / distance)
  );

  const opacity = Math.max(0, 1 - progress * 1.2);

  // WHAT IS → 왼쪽
  whiteTitle.style.opacity = opacity;
  whiteTitle.style.transform = `translateX(${-300 * progress}px)`;

  // K-POP MD? → 오른쪽
  accentTitle.style.opacity = opacity;
  accentTitle.style.transform = `translateX(${300 * progress}px)`;

  // 설명 제목 → 왼쪽
  definitionTitle.style.opacity = opacity;
  definitionTitle.style.transform = `translateX(${-250 * progress}px)`;

  // 설명 문장 → 오른쪽
  description.style.opacity = opacity;
  description.style.transform = `translateX(${250 * progress}px)`;
}

window.addEventListener('scroll', updateCover, { passive: true });
window.addEventListener('resize', updateCover);

updateCover();
