const raf = window.requestAnimationFrame;
const MOVE_ANIM_INTER = 50;

export default function draggable(ele: HTMLDivElement) {
  if (!ele) {
    throw new Error('Input element must be draggable!');
  }

  let startX = 0;
  let startY = 0;

  let left = 0;
  let top = 0;

  let rafID: number;

  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  const { width, height } = ele.getBoundingClientRect();

  ele.addEventListener(
    'touchstart',
    function (event: TouchEvent) {
      startX = event.targetTouches[0].pageX;
      startY = event.targetTouches[0].pageY;

      top = ele.offsetTop;
      left = ele.offsetLeft;

      event.preventDefault();
      event.stopPropagation();
    },
    false
  );

  ele.addEventListener(
    'touchmove',
    function (event: TouchEvent) {
      const offsetX = event.targetTouches[0].pageX - startX;
      const offsetY = event.targetTouches[0].pageY - startY;

      ele.style.top = `${top + offsetY}px`;
      ele.style.left = `${left + offsetX}px`;
      ele.style.right = 'auto';
      ele.style.bottom = 'auto';

      event.preventDefault();
      event.stopPropagation();
    },
    false
  );

  function touchDone(event: TouchEvent) {
    const deltaX = event.changedTouches[0].pageX - startX;
    const deltaY = event.changedTouches[0].pageY - startY;

    const totalX = left + deltaX;
    const totalY = top + deltaY;

    ele.style.left = `${totalX}px`;
    ele.style.top = `${totalY}px`;
    ele.style.right = 'auto';
    ele.style.bottom = 'auto';

    if (rafID) cancelAnimationFrame(rafID);

    rafID = raf(() => {
      let nowX = totalX;
      let nowY = totalY;

      if (nowX + width / 2 > clientWidth) {
        nowX = clientWidth - width;
      } else if (nowX + width / 2 < 0) {
        nowX = 0;
      }

      if (nowY + height / 2 > clientHeight) {
        nowY = clientHeight - height;
      } else if (nowY - height / 2 < 0) {
        nowY = 0;
      }

      ele.style.webkitTransition = `left ${MOVE_ANIM_INTER}ms ease-in-out, top ${MOVE_ANIM_INTER}ms ease-in-out`;
      ele.style.transition = `left ${MOVE_ANIM_INTER}ms ease-in-out, top ${MOVE_ANIM_INTER}ms ease-in-out`;

      const onAnimationDone = () => {
        ele.style.webkitTransition = ele.style.transition = 'none';
        ele.removeEventListener('webkitTransitionEnd', onAnimationDone, false);
        ele.removeEventListener('transitionend', onAnimationDone, false);
      };

      ele.addEventListener('webkitTransitionEnd', onAnimationDone, false);
      ele.addEventListener('transitionend', onAnimationDone, false);
      ele.style.top = `${nowY}px`;
      ele.style.left = `${nowX}px`;
    });
  }

  ele.addEventListener('touchend', touchDone, true);
  ele.addEventListener('touchcancel', touchDone, true);
}
