const raf = window.requestAnimationFrame;
const MOVE_ANIM_INTER = 200;

export default function draggable(ele: HTMLElement, adsorb = { x: 20, y: 80 }) {
  if (!ele) {
    throw new Error('必须是可拖拽的元素');
  }

  let startX = 0;
  let startY = 0;

  let left = 0;
  let top = 0;

  const cw = document.documentElement.clientWidth;
  const ch = document.documentElement.clientHeight;

  const { width, height } = ele.getBoundingClientRect();

  ele.addEventListener(
    'touchstart',
    function (event: TouchEvent) {
      startX = event.targetTouches[0].pageX;
      startY = event.targetTouches[0].pageY;

      top = ele.offsetTop;
      left = ele.offsetLeft;

      event.preventDefault();
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
    },
    false
  );

  function touchDone(event: TouchEvent) {
    const dx = event.changedTouches[0].pageX - startX;
    const dy = event.changedTouches[0].pageY - startY;

    const ty = top + dy;
    const tx = left + dx;

    ele.style.top = `${ty}px`;
    ele.style.left = `${tx}px`;
    ele.style.right = 'auto';
    ele.style.bottom = 'auto';

    const adsorb_safe_x = cw - width - adsorb.x;
    const adsorb_safe_y = ch - height - adsorb.y;

    raf(() => {
      let nx;
      let ny = ty;

      if (tx + width / 2 < cw / 2) {
        nx = adsorb.x;
      } else {
        nx = adsorb_safe_x;
      }

      if (ty < adsorb.y) {
        ny = adsorb.y;
      } else if (ty > adsorb_safe_y) {
        ny = adsorb_safe_y;
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
      ele.style.top = `${ny}px`;
      ele.style.left = `${nx}px`;
    });
  }

  ele.addEventListener('touchend', touchDone, true);
  ele.addEventListener('touchcancel', touchDone, true);
}
