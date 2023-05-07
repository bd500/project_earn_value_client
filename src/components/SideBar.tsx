import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Link} from "react-router-dom";

const SideBar = () => {
    return (
        <div style={{height: "100vh", display: "flex"}}>
            <Sidebar style={{height: "100%", display: "flex"}}>
                <Menu>
                    <MenuItem component={<Link to={"/dashboard"} />}>
                        Dashboard
                    </MenuItem>
                    <MenuItem component={<Link to={"/track"} />}>
                        Track
                    </MenuItem>
                    <MenuItem component={<Link to={"/project"} />}>
                        Project
                    </MenuItem>
                    <MenuItem component={<Link to={"/portfolio"} />}>
                        Portfolio
                    </MenuItem>
                    <MenuItem component={<Link to={"/report"} />}>
                        Report
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};
export default SideBar;
