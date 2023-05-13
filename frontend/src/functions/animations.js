import anime from 'animejs/lib/anime.es.js';

export const fadeInVertical = (element) => {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: ['10px', '0px'],
    easing: 'easeInOutQuad',
    duration: 250,
  });
};

export const fadeInHorizontal = (element) => {
  anime({
    targets: element,
    opacity: [0, 1],
    translateX: ['20px', '0px'],
    easing: 'easeInOutQuad',
    duration: 500,
  });
};

export const fadeInAndScale = (element) => {
  anime({
    targets: element,
    opacity: [0, 1],
    scale: [0.5, 1],
    easing: 'easeInOutQuad',
    duration: 500,
  });
};
