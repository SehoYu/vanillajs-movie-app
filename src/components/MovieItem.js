import { Component } from "../core/heropy";

export default class MovieItem extends Component {
  // 상위 컴포넌트(상속x)에서 전달된 props 객체
  constructor(props) {
    super({
      props,
      tagName: 'a'
    });
  }
  render() {
    const { movie } = this.props;
    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`);
    this.el.classList.add('movie');
    // img 태그가 아니라 백그라운드 이미지로 지정하는 이유? 
    // 포스터 크기 때문에 레이아웃 구조가 무너질 수 있다
    this.el.style.backgroundImage = `url(${movie.Poster})`;
    this.el.innerHTML = /*html*/`
      <div class="info">
        <div class="year">${movie.Year}</div>
        <div class="title">${movie.Title}</div>
      </div>
    `;
  }
}