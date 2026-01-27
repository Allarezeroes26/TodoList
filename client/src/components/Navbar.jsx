import React from 'react'
import { PanelLeft } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="navbar items-center justify-center flex flex-row bg-base-100 sm:px-10 md:px-5 lg:px-20 shadow-sm display-paragraph py-5">
        <div className="flex-1">
            <a className="btn btn-ghost font-display font-bold text-2xl tracking-wider">TODO</a>
        </div>

        <div>
            <div className="drawer">
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-1" className="btn drawer-button"><PanelLeft /></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
