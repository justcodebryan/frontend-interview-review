interface IPullRefreshConfig {
  ele?: HTMLElement;
  enabled?: boolean;
  refreshListener?: () => void;
  refreshStyleConfig?: Record<string, string>;
}

enum PullDirection {
  UNKONW,
  DOWN,
  UP
}

function defaultRefreshListener() {
  location.reload();
}

const defaultRefreshStyleConfig = {
  color: '#000',
  fontSize: '12px',
  backgroundColor: 'rgba(255, 255, 255, 1)'
};

export default class PullRefreshFactory {
  constructor(config: IPullRefreshConfig = {}) {
    this.ele = config.ele || document.body;
    this.enabled = config.enabled || false;
    this.refreshListener = config.refreshListener || defaultRefreshListener;
    this.refreshStyleConfig = config.refreshStyleConfig || defaultRefreshStyleConfig;

    this.init();
  }

  ele: HTMLElement;
  enabled: boolean = (window as any).__pull_refresh_enabled__ || false;

  refreshListener: () => void;

  position = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    direction: PullDirection.UNKONW,
    scrollOnTop: true
  };

  loading: boolean =  false;

  refreshContainer: HTMLElement | null = null;

  timer: NodeJS.Timeout | null;

  refreshStyleConfig: Record<string, string> = defaultRefreshStyleConfig;

  setEnabled(flag: boolean) {
    this.enabled = false;
    (window as any).setPullRefreshEnabled(flag);
  }

  setRefreshListener(fn: any) {
    this.refreshListener = fn;
    // console.log(this, 99999);
  }

  setLoading(flag: boolean) {
    this.loading = flag;
  }

  setRefreshContainer(container: HTMLElement) {
    this.refreshContainer = container;
  }

  checkScrollIsOnTop() {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    return top <= 0;
  }

  initTouchStart() {
    const _self = this;
    _self.ele.addEventListener('touchstart', function(event: TouchEvent) {
      if (!_self.enabled) return;

      Object.assign(_self.position, {
        scrollOnTop: _self.checkScrollIsOnTop(),
        startX: event.touches[0].pageX,
        startY: event.touches[0].pageY
      });
    });
  }

  initTouchMove() {
    const _self = this;
    _self.ele.addEventListener('touchmove', function(event: TouchEvent) {
      const { startX, startY, scrollOnTop } = _self.position;
      const offsetX = event.touches[0].pageX - startX;
      const offsetY = event.touches[0].pageY - startY;

      if (offsetY > 150 && offsetY > Math.abs(offsetX)) {
        _self.position.direction = PullDirection.DOWN;
      } else if (offsetY < 0 && Math.abs(offsetY) > Math.abs(offsetX)) {
        _self.position.direction = PullDirection.UP;
      } else {
        _self.position.direction = PullDirection.UNKONW;
      }

      if (
        !_self.enabled ||
        _self.loading || 
        !scrollOnTop || 
        _self.position.direction || 
        !== PullDirection.DOWN
      ) return;

      console.log('到达下拉阈值: ', offsetY);
      
      _self.setLoading(true);
      Object.assign(_self.ele.style, {
        transform: 'translate3d(0, 100px, 0)',
        transition: 'all ease .5s'
      });

      (_self.refreshContainer as HTMLElement).innerHTML = '下拉刷新内容...'
    });
  }

  initTouchEnd() {
    const _self = this;
    _self.ele.addEventListener('touchend', function(event: TouchEvent) {
      if (!_self.enabled) return;
      const { scrollOnTop, direction } = _self.position;
      if (!scrollOnTop || this.dir !== PullDirection.DOWN || !self.loading) return;
      (_self.refreshContainer as HTMLElement).innerHTML = '<div class="refresh-icon"></div>';
      _self.timer = setTimeout(function() {
        if (_self.timer) clearTimeout(_self.timer);
        (_self.refreshContainer as HTMLElement).innerHTML = '';
        Object.assign(_self.ele.style, {
          transform: 'translate3d(0, 0, 0)',
          transition: 'all cubic-bezier(.21, 1.93, .53, .64) .5s'
        });
        _self.setLoading(false);
        _self.position.direction = PullDirection.UNKONW;
        setTimeout(() => {
          _self.refreshListener();
          setTimeout(() => {
            Object.assign(_self.ele.style, {
              transform: '',
              transition: ''
            });
          }, 500);
        })
      }, 1000);
    });
  }

  initRefreshStyle(cssStr: string = '') {
    if (document.getElementById('pull_refresh__style') && cssStr.length > 0) {
      (document.getElementById('pull_refresh__style') as HTMLElement).innerHTML = cssStr;
      return;
    }

    const styleDOM = document.createElement('style');
    styleDOM.id = 'pull_refresh__style';
    styleDOM.innerHTML = `
      .pull_refresh__container {
        position: absolute;
        width: 100%;
        height: 100px;
        line-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${this.refreshStyleConfig.color};
        font-size: ${this.refreshStyleConfig.fontSize};
        text-align: center;
        left: 0;
        top: 0;
        backgound-color: ${this.refreshStyleConfig.backgroundColor};
        transform: translate3d(0, -100px, 0);
      }

      div.refresh-icon {
        width: 26px;
        height: 26px;
        border: 2px solid rgba(126, 126, 126, 0.2);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;

    document.head.appendChild(styleDOM);
  }

  initRefreshContainer() {
    const refreshDOM = document.createElement('div');
    refreshDOM.classList.add('pull_refresh__container');

    if (!this.ele.firstElementChild) {
      this.ele.appendChild(refreshDOM);
      return;
    }

    this.ele.insertBefore(refreshDOM, this.ele.firstElementChild);
    setTimeout(() => {
      this.setRefreshContainer(refreshDOM);
    }, 0);
  }

  init() {
    (window as any).setPullRefreshEnabled = function(flag: boolean) {
      (window as any).__pull_refresh_enabled__ = flag;
    };
    
    this.setEnabled(true);
    this.initRefreshStyle();
    this.initRefreshContainer();
    this.initTouchStart();
    this.initTouchMove();
    this.initTouchEnd();
  }
}
