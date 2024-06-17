import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav id="navbar">
      <h3 id="navbar-title">MOVIIEESSS</h3>
      <ul id="navbar-list">
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/">
            HOME
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="navbar-link" to="/">
            movie
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
