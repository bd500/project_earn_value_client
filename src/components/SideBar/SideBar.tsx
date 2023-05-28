import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Link, useLocation} from "react-router-dom";
import {FaBars, FaClock, FaBriefcase, FaFolder} from "react-icons/fa";

const SideBar = () => {
    const location = useLocation();
    const actived = {background: "#d3d3d3"};

    return (
        <div style={{height: "100vh", display: "flex"}}>
            <Sidebar style={{display: "flex"}} defaultCollapsed>
                <Menu>
                    <MenuItem
                        component={<Link to={"/dashboard"} />}
                        icon={<FaBars />}
                        style={
                            location.pathname === "/dashboard"
                                ? actived
                                : undefined
                        }
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem
                        component={<Link to={"/project"} />}
                        icon={<FaBriefcase />}
                        style={
                            location.pathname === "/project"
                                ? actived
                                : undefined
                        }
                    >
                        Project
                    </MenuItem>
                    <MenuItem
                        component={<Link to={"/track"} />}
                        icon={<FaClock />}
                        style={
                            location.pathname === "/track" ? actived : undefined
                        }
                    >
                        Track
                    </MenuItem>
                    <MenuItem
                        component={<Link to={"/portfolio"} />}
                        icon={<FaFolder />}
                        style={
                            location.pathname === "/portfolio"
                                ? actived
                                : undefined
                        }
                    >
                        Portfolio
                    </MenuItem>
                    {/* <MenuItem
                        component={<Link to={"/report"} />}
                        icon={<FaChartArea />}
                        style={
                            location.pathname === "/report"
                                ? actived
                                : undefined
                        }
                    >
                        Report
                    </MenuItem> */}
                </Menu>
            </Sidebar>
        </div>
    );
};
export default SideBar;
