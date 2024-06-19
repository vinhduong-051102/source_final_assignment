import {
  BodyContainer,
  MenuContainer,
  SidebarContainer,
  LogoContainer,
  LogoPC,
  LogoMobile,
  ListMenuItemLayout,
  MenuItemLayout,
  MenuItemIcon,
  MenuItemText,
  Logout,
} from './styled';
import {
  logoIcon,
  logoTextIcon,
  homeIcon,
  vowIcon,
  addIcon,
  assistantIcon,
} from '../../constants/icons';
import targetIcon from '../../utils/svg/target_icon.svg';
import blogIcon from '../../utils/svg/blog_icon.svg';

import { Link } from 'react-router-dom';
const Menu = ({ children }) => {
  return (
    <MenuContainer>
      <SidebarContainer>
        <LogoContainer>
          <Link to="/">
            <LogoPC src={logoTextIcon} />
            <LogoMobile src={logoIcon} />
          </Link>
        </LogoContainer>
        <ListMenuItemLayout>
          <MenuItemLayout to="/learn">
            <MenuItemIcon src={homeIcon} />
            <MenuItemText>học</MenuItemText>
          </MenuItemLayout>
          <MenuItemLayout to="/characters">
            <MenuItemIcon src={vowIcon} />
            <MenuItemText>phát âm</MenuItemText>
          </MenuItemLayout>
          <MenuItemLayout to="/chat">
            <MenuItemIcon src={assistantIcon} />
            <MenuItemText>Trợ lý của bạn</MenuItemText>
          </MenuItemLayout>
          <MenuItemLayout to="/add">
            <MenuItemIcon src={addIcon} />
            <MenuItemText>Thêm mới</MenuItemText>
          </MenuItemLayout>
          <MenuItemLayout to="/target">
            <MenuItemIcon src={targetIcon} />
            <MenuItemText>Đặt mục tiêu</MenuItemText>
          </MenuItemLayout>
          <MenuItemLayout to="/blog">
            <MenuItemIcon src={blogIcon} />
            <MenuItemText>Bài viết</MenuItemText>
          </MenuItemLayout>
        </ListMenuItemLayout>
      </SidebarContainer>
      <BodyContainer>{children}</BodyContainer>
    </MenuContainer>
  );
};

export default Menu;
