import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer';
import classnames from 'classnames';

import './Item.scss';

if (typeof window !== 'undefined') {
  require('intersection-observer');
}

export default class Item extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  changeItem = (inView) => {
    const { onChange } = this.props;

    if (inView) {
      onChange();
    }
  }

  render() {
    const { title, description, id, className } = this.props;

    return (
      <div className={classnames('item', className)} id={id}>
        <div className="item__inner">
          <Observer tag="div" onChange={this.changeItem}>
            <h2 className="item__heading">{title}</h2>
            <p className="item__description">{description}</p>
          </Observer>
        </div>
      </div>
    );
  }
}
