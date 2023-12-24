/* Component */
export class Component {
  constructor(payload = {}) {
    const { tagName = 'div', state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    // ...
  }
}

/* Router */
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/');
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  const query = queryString.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, ''); // query 정보를 객체 형태로 history 객체에 저장
  
  const currentRoute = routes.find(route =>
    new RegExp(`${route.path}/?$`).test(hash)
  ); // find() = 조건을 만족하는 가장 첫 번째 요소 반환, 없으면 undefined
  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

/* Store */
export class Store {
  // state { message: Hello! }
  constructor(state) { 
    this.state = {}; // state 정보 저장
    this.observers = {}; // state 변화 하면 실행할 콜백 함수 저장
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key], // state['message']
        set: val => {
          state[key] = val;
          if (this.observers[key]) {
            this.observers[key].forEach(observer => observer(val));
          }
        }
      });
    }
  }
  // subscribe 역할 = state 변화에 대응하는 콜백 함수 연결
  // api를 활용하는 것이 아니라, 비슷하게 동작하도록 이름만 차용
  subscribe(key, cb) {
    // this.observers[key] = [cb];
    // observers { 'message': () => {} }, 콜백 1개만 연결
    // => 다른 컴포넌트의 콜백으로 덮어쓰는 문제 발생 => 고도화 필요
    // observers { 'message': [() => {}, () => {}, ... ] }, 배열 = 다수의 콜백 연결
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb];
  }
}


