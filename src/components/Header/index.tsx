import React, { FC } from 'react';
import { Menu, Sticky, Image, Dropdown } from 'semantic-ui-react';
import { User } from '../../reducers/ApplicationReducer';
import logo from '../../images/_logo.svg';

const userWithIcon = (imageUrl: string, name: string) => (
  <span>
    <Image src={imageUrl} avatar />
    <span>{name}</span>
  </span>
);

interface HeaderProps {
  user: User;
  handleOnClickSignOut: () => void;
}

const header: FC<HeaderProps> = ({ user, handleOnClickSignOut }) => (
  <header>
    <Sticky>
      <Menu>
        <Menu.Item name="Home" header>
          <img src={logo} alt="logo" />
          Google Task Client
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown trigger={userWithIcon(user.imageUrl, user.name)}>
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="log out"
                  text="Sign Out"
                  onClick={handleOnClickSignOut}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Sticky>
  </header>
);

export default header;
