import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Segment from 'components/segment';
import Button from 'components/button';

import Section from 'components/section';
import Item from 'components/item';

export default class Home extends PureComponent {

  render() {
    return (
      <div>
        <Helmet title="Home" />

        <Segment>
          <h1>Hello world!</h1>
        </Segment>

        <Segment>
          <Section>
            <Item
              id="itemA"
              key="item-1"
              title="Nullam malesuada"
              description="Nulla ac ultrices lectus. Nam lacinia elit sit
              amet turpis porttitor, in gravida purus consectetur. Praesent
              viverra nisl nec lobortis facilisis. Nunc nibh mi, tincidunt
              id tempor vel, aliquam eu urna."
              image={require('assets/images/rvk_2x.jpg')}
            />
            <Item
              id="itemB"
              key="item-2"
              title="Sed nec risus lacus"
              description="Sed non eleifend orci. Etiam ut quam vitae ligula
              sagittis sagittis. Duis ac metus at elit convallis lobortis.
              In hac habitasse platea dictumst. Praesent vel ligula leo."
              image={require('assets/images/ny_2x.jpg')}
            />
          </Section>
        </Segment>

        <Segment>
          <Button>Button</Button>
          <Button to="http://ueno.co">Ueno.co</Button>
          <Button to="/about">About</Button>
        </Segment>
      </div>
    );
  }
}
