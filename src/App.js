import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";

export default class App extends Component {
  render() {
    const theHeader = new TheHeader().el;
    const theFooter = new TheFooter().el;
    const routeView = document.createElement('router-view'); // 기본 태그와 충돌을 방지하기 위한 태그 이름
    
    this.el.append(
      theHeader,
      routeView,
      theFooter
    );
  }
}