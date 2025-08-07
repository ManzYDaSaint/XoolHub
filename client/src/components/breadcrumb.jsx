import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav className="text-blue-500 my-4">
      <ul className="flex">
        <li>
          <Link to={"/"} className="hover:text-blue-700 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const title = value;

          return (
            <li key={to}>
              <span className="mx-2">/</span>
              {last ? <span>{title}</span> : <Link to={title}></Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
