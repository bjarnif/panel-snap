import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineLite from 'gsap/TimelineLite';
import 'lib/ScrollToPlugin';

import scrollToElement from 'utils/scroll-to-element';

import s from './Section.scss';

export default class Section extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    activeItem: undefined,
  }

  image = [];
  scrollUp = undefined;
  isScrolling = false;
  isAnimating = false;

  componentDidMount() {
    const { children } = this.props;
    const t = new TimelineLite();

    t
      .set(
        this.image[children[0].props.id],
        { zIndex: 1 },
      );

    window.addEventListener('mousewheel', this.onMouseWheel);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    clearTimeout(this.scrollTimer);

    window.removeEventListener('mousewheel', this.onMouseWheel);
    window.removeEventListener('scroll', this.onScroll);
  }

  onMouseWheel = ({ deltaY }) => {
    this.scrollUp = deltaY < -0.01;
  }

  onScroll = () => {
    const scrollTop = window.pageYOffset || window.scrollY;

    clearTimeout(this.scrollTimer);

    if (this.scrollStart === undefined) {
      this.scrollStart = scrollTop;
    }

    this.scrollTimer = setTimeout(() => {
      this.distance = Math.abs(this.scrollStart - scrollTop);
      this.moveChild();
      this.scrollStart = undefined;
    }, 500);
  }

  moveChild() {
    const t = new TimelineLite();
    const child = this.getChild();
    const scrollTop = window.pageYOffset || window.scrollY;

    if (!child || this.isScrolling) {
      return;
    }

    clearTimeout(this.scrollTimer);
    this.isScrolling = true;

    t
      .to(
        window,
        0.8,
        {
          scrollTo: Math.round(child.getBoundingClientRect().top + scrollTop),
          ease: 'Power4.easeInOut',
        },
      ).call(() => {
        this.isScrolling = false;
      });
  }

  getChild() {
    if (!this.section) return;

    const revealPercentage = this.distance > 150 ? 0.5 : 0.025;
    const childs = [].slice.call(this.section.querySelectorAll(`.${s.section__child}`));

    return childs.map((child) => {
      const top = child.getBoundingClientRect().top + window.innerHeight;
      const bottom = window.innerHeight - child.getBoundingClientRect().top;

      if (!this.scrollUp && bottom > window.innerHeight * revealPercentage
        && bottom < window.innerHeight * (1 + revealPercentage)) {
        return child;
      } else if (this.scrollUp && top > window.innerHeight * revealPercentage
        && top < window.innerHeight * (1.25 + revealPercentage)) {
        return child;
      }

      return undefined;
    }).filter(child => child !== undefined)[0];
  }

  onItemChange = (id) => {
    const t = new TimelineLite();

    this.setState({ activeItem: id });

    this.t = t;
    const { section } = this;
    const activeImage = this.image[id];
    const allImages = section.querySelectorAll(`.${s.section__imageDiv}`);
    const imageOverlay = section.querySelector(`.${s.section__imageOverlayAnimation}`);

    if (!this.isAnimating) {
      this.isAnimating = true;
      t
        .set(
          imageOverlay,
          {
            backgroundColor: '#34c1fc',
            y: this.scrollUp ? '-100%' : '100%',
          },
        )
        .fromTo(
          imageOverlay,
          0.6,
          { y: this.scrollUp ? '-100%' : '100%' },
          {
            y: '0%',
            ease: 'Power4.easeInOut',
          },
        );

      t
        .set(
          allImages,
          { zIndex: 0 },
        )
        .set(
          activeImage,
          { zIndex: 1 },
        );

      t
        .to(
          imageOverlay,
          0.6,
          {
            y: this.scrollUp ? '100%' : '-100%',
            ease: 'Power4.easeInOut',
          },
        )
        .call(() => {
          this.isAnimating = false;
        });
    }
  }

  renderNavigation = item => (
    <button
      key={`button-${item.props.id}`}
      className={s(s.section__button,
        { isActive: item.props.id === this.state.activeItem })
      }
      onClick={() => scrollToElement(`#${item.props.id}`)}
    >
      {item.props.title}
    </button>
  );

  renderImages = item => (
    <div
      key={`image-${item.props.id}`}
      ref={(c) => { this.image[item.props.id] = c; }}
      className={s.section__imageDiv}
    >
      <img
        src={item.props.image}
        className={s.section__imageSource}
        alt=""
      />
    </div>
  );

  render() {
    const {
      children,
    } = this.props;

    return (
      <section
        ref={(c) => { this.section = c; }}
        className={s.section}
      >
        <section className={s.section__container}>
          <div className={s.section__buttons}>
            <div className={s.section__buttonWrap}>
              {children.map(this.renderNavigation)}
            </div>
          </div>
          <div className={s.section__row}>
            <div className={s.section__colLeft}>
              <div
                className={s.section__imageOffset}
              >
                <div className={s.section__image}>
                  <div className={s.section__imageOverlayAnimation} />
                  {children.map(this.renderImages)}
                </div>
              </div>
            </div>

            <div className={s.section__colRight}>
              {children.map(child => React.cloneElement(child, {
                className: s.section__child,
                onChange: () => this.onItemChange(child.props.id),
              }))}
            </div>
          </div>
        </section>
      </section>
    );
  }
}
