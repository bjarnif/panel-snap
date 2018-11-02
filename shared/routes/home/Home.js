import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Segment from 'components/segment';
import Button from 'components/button';
import Space from 'components/space';

import Section from 'components/section';
import Item from 'components/item';

export default class Home extends PureComponent {

  render() {
    return (
      <div>
        <Space>
          Try to scroll down :)
        </Space>

        <Section>
          <Item
            id="itemA"
            key="item-1"
            title="Nulla"
            description="Nulla ac ultrices lectus. Nam lacinia elit sit
            amet turpis porttitor, in gravida purus consectetur. Praesent
            viverra nisl nec lobortis facilisis. Nunc nibh mi, tincidunt
            id tempor vel, aliquam eu urna."
            image={require('assets/images/5.png')}
          />
          <Item
            id="itemB"
            key="item-2"
            title="Etiam"
            description="Sed non eleifend orci. Etiam ut quam vitae ligula
            sagittis sagittis. Duis ac metus at elit convallis lobortis.
            In hac habitasse platea dictumst. Praesent vel ligula leo."
            image={require('assets/images/12.png')}
          />
        </Section>

        <Space>
          Space under
        </Space>
      </div>
    );
  }
}
