import React from 'react';

export type NormalLink = {
  key: number;
  linkTo: string;
  textId: string;
  icon: React.ReactNode;
};

export type SubMenuItem = {
  key: string;
  linkTo: string;
  textId: string;
  icon: React.ReactNode;
};

export type LinkWithSubMenu = {
  key: number;
  textId: string;
  icon: React.ReactNode;
  subMenu: SubMenuItem[];
};

export type NavLink = NormalLink | LinkWithSubMenu;
