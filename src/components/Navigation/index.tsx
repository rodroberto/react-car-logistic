import React from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get current route
import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag,
  MdMailOutline,
  MdOutlinePeople,
  MdOutlineNotificationsActive,
  MdOutlineChatBubbleOutline,
  MdOutlineSettingsInputComposite,
} from 'react-icons/md';

import { NavItem } from './NavItem';

// Define the nav items
const items: NavbarItem[] = [
  {
    type: 'link',
    label: 'Dashboard',
    icon: MdOutlineSpaceDashboard,
    path: '/',
  },
  {
    type: 'link',
    label: 'Branches',
    icon: MdOutlineShoppingBag,
    path: '/branches',
  },
  {
    type: 'link',
    label: 'Users',
    icon: MdOutlinePeople,
    path: '/users',
  },
  { type: 'link', label: 'Reports', icon: MdMailOutline, path: '/reports' },
  {
    type: 'link',
    label: 'Notifications',
    icon: MdOutlineNotificationsActive,
    path: '/notifications',
    count: 24,
  },
  {
    type: 'link',
    label: 'Chat',
    icon: MdOutlineChatBubbleOutline,
    path: '/chats',
    count: 8,
  },
  {
    type: 'link',
    label: 'Settings',
    icon: MdOutlineSettingsInputComposite,
    path: '/settings',
  },
];

interface NavigationProps {
  collapse: boolean;
}

export const Navigation = ({ collapse }: NavigationProps) => {
  const location = useLocation(); // Get the current location (route)

  return (
    <List w='full' my={8}>
      {items.map((item, index) => (
        <ListItem key={index}>
          {/* Check if the current path matches the item path */}
          <NavItem
            item={item}
            isActive={location.pathname === item.path} // Set isActive based on current route
            collapse={collapse}
          />
        </ListItem>
      ))}
    </List>
  );
};
