import TweenLite from 'gsap/TweenLite';

export default (element, { speed = 1 } = {}) => {
  const scrollTop = window.pageYOffset || window.scrollY;
  const obj = { num: scrollTop };

  const domElement = typeof element === 'string' ? document.querySelector(element) : element;

  if (!domElement) {
    return;
  }

  const num = domElement.getBoundingClientRect().top + scrollTop;

  if (speed === Infinity) {
    return window.scrollTo(0, num);
  }

  TweenLite.to(
    obj,
    1,
    {
      num,
      ease: 'Power4.easeInOut',
      onUpdate: () => {
        window.scrollTo(0, obj.num);
      },
    },
  );
};
