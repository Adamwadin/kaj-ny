import { NavLink } from "react-router-dom";
 
export const Navigation = () => {
  return (
    <nav>
      <h3>THE ZOO</h3>
      <ul>
        <li>
          <NavLink to="/">Hem</NavLink>
        </li>
        <li>
          <NavLink to="/animals">Djuren</NavLink>
        </li>
      </ul>
    </nav>
  );
};