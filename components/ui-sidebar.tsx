import React from "react";

export default function sidebar () {


    return (
        <nav className="nxl-navigation">
        <div className="navbar-wrapper">
            <div className="m-header">
                <a href="/admin/dashboard" className="b-brand">
                    <img src="assets/images/logo-full.png" alt="" className="logo logo-lg" />
                    <img src="assets/images/logo-abbr.png" alt="" className="logo logo-sm" />
                </a>
            </div>
            <div className="navbar-content">
                <ul className="nxl-navbar">
                    <li className="nxl-item nxl-caption">
                        <label>Navigation</label>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="/admin/dashboard" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-airplay"></i></span>
                            <span className="nxl-mtext">Dashboard</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-cast"></i></span>
                            <span className="nxl-mtext">Customers</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                        <ul className="nxl-submenu">
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/customers">View Customers</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/add">Add New</a></li>
                        </ul>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-send"></i></span>
                            <span className="nxl-mtext">Projects</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                        <ul className="nxl-submenu">
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/projects">View Projects</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/projects/add">Add Project</a></li>
                        </ul>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-at-sign"></i></span>
                            <span className="nxl-mtext">Payments</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                        <ul className="nxl-submenu">
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/payments">View Payments</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/invoice/create">Create Invoice</a></li>
                        </ul>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-dollar-sign"></i></span>
                            <span className="nxl-mtext">Settings</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                        <ul className="nxl-submenu">
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/settings">Settings</a></li>
                            <li className="nxl-item"><a className="nxl-link" href="/admin/dashboard/settings/profile">Profile</a></li>
                        </ul>
                    </li>
                    <li className="nxl-item nxl-hasmenu">
                        <a href="javascript:void(0);" className="nxl-link">
                            <span className="nxl-micon"><i className="feather-dollar-sign"></i></span>
                            <span className="nxl-mtext">Logout</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}