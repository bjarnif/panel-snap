import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const { title, description, id, onChange, className } = this.props;

    return (
      <div className={s(s.item, className)} id={id}>
        <div className={s.item__inner}>
          <Waypoint
            onEnter={onChange}
            // scrollableAncestor={window !== undefined}
          />
          <h2 className={s.item__heading}>{title}</h2>
          <p className={s.item__description}>{description}</p>
        </div>
      </div>
    );
  }
}
