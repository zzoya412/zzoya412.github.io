// 기존에 정상 작동하는 화면 진입 효과. 기능 추가 시 유지한다.
document.documentElement.classList.add('has-js');
const revealSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

const main = document.querySelector('main#top');
const heroNumber = main?.querySelector('.hero-big-number');
const heroLines = main?.querySelector('.hero-lines');

if (heroNumber && heroLines) {
  const rate = heroNumber.firstChild;
  const targetRate = 4.2;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rate.textContent = targetRate.toFixed(1);
    heroLines.classList.add('is-animated');
  } else {
    const duration = 1200;

    requestAnimationFrame(() => {
      requestAnimationFrame((startTime) => {
        heroLines.classList.add('is-animated');

        const animateRate = (timestamp) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const displayedRate = Math.round(targetRate * easedProgress * 10) / 10;

          rate.textContent = displayedRate === 0 ? '0' : displayedRate.toFixed(1);

          if (progress < 1) {
            requestAnimationFrame(animateRate);
          } else {
            rate.textContent = targetRate.toFixed(1);
          }
        };

        requestAnimationFrame(animateRate);
      });
    });
  }
}

const compareSection = document.querySelector('.unemployment-compare-section');

if (compareSection) {
  const years = {
    a: {
      rate: '4.2',
      description: '연도 A의 학습용 가상 데이터입니다. 그래프와 설명은 실제 통계가 아닙니다.',
      image: 'images/year-a.jpg',
      label: '연도 A',
      title: '연도 A의 실업률 변화'
    },
    b: {
      rate: '3.6',
      description: '연도 B의 학습용 가상 데이터입니다. 그래프와 설명은 실제 통계가 아닙니다.',
      image: 'images/year-b.jpg',
      label: '연도 B',
      title: '연도 B의 실업률 변화'
    }
  };
  const buttons = {
    a: compareSection.querySelector('.year-button-a'),
    b: compareSection.querySelector('.year-button-b')
  };
  const rate = compareSection.querySelector('.year-rate');
  const description = compareSection.querySelector('.year-description');
  const chart = compareSection.querySelector('.year-chart');
  const yearLabel = compareSection.querySelector('.year-label');
  const title = compareSection.querySelector('.metric-title');
  const chartLabel = compareSection.querySelector('.chart-footer > span:first-child');
  const chartStatus = compareSection.querySelector('.chart-status');
  const status = compareSection.querySelector('.practice-status');

  function selectYear(year) {
    const data = years[year];
    rate.firstChild.textContent = data.rate;
    description.textContent = data.description;
    chart.src = data.image;
    chart.alt = `학습용 가상 데이터 ${data.label} 실업률 추이 그래프`;
    yearLabel.textContent = `YEAR ${year.toUpperCase()}`;
    title.textContent = data.title;
    chartLabel.textContent = data.label;
    chartStatus.textContent = `${data.label} 그래프가 표시 중입니다.`;
    status.lastChild.textContent = ` ${data.label}의 학습용 가상 데이터가 표시 중입니다.`;

    Object.entries(buttons).forEach(([key, button]) => {
      const selected = key === year;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  buttons.a.addEventListener('click', () => selectYear('a'));
  buttons.b.addEventListener('click', () => selectYear('b'));
}
