import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutMenuBar from '../LayoutMenuBar/LayoutMenuBar';

export default function Layout() {
  return (
    <div>
      <LayoutMenuBar />
      <Outlet />
    </div>
  );
}
