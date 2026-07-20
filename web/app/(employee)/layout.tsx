'use client'

import { Fragment, useEffect, useState, type ReactNode } from "react";
import { NavbarMenuDesktop } from "../components/navbar-menu-desktop";
import { HeaderMobile } from "../components/header-mobile";

interface ChildrenType {
  children: ReactNode
}

export default function ClientLayout({ children }: ChildrenType) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Fragment>
      {windowWidth >= 1024 ? (
        <div className="flex">
          <NavbarMenuDesktop />
          {children}
        </div>
      ) : (
        <div className="flex flex-col">
          <HeaderMobile title='Dashboard' />
          {children}
        </div>
      )}
    </Fragment>
  )
}