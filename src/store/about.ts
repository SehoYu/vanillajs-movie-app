import { Store } from '../core/heropy';

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: 'https://heropy.blog/css/images/logo.png',
  name: 'PorcoRosso / SehoYu',
  email: 'seho.yu.dev@gmail.com',
  blog: '',
  github: 'https://github.com/SehoYu',
  repository: 'https://github.com/SehoYu/vanillajs-movie-app',
});
