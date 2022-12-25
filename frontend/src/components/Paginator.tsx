import React from "react";
import { Link } from "react-router-dom";

export const Paginator = (props: {page: number, lastPage: number, pageChanged: (page: number) => void}) => {
  const next = () => {
    if (props.page < props.lastPage) {
      props.pageChanged(props.page + 1);
    };
  }

  const previous = () => {
    if (props.page > 1) {
      props.pageChanged(props.page - 1);
    }
  }

  return (
    <nav className="bottom-bar">
      <ul className="bottom-nav-list">
        <li className="bottom-nav-item">
          <a href="#" onClick={previous}>Previous</a>
        </li>
        <li className="bottom-nav-item">
          <a href="#" onClick={next}>Next</a>
        </li>
      </ul>
      <ul className="bottom-nav-list">
        <li className="bottom-nav-item">
          <Link to="/users/create">add</Link>
        </li>
      </ul>
    </nav>
  );
}
