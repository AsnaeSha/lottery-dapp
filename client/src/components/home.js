import React from 'react';
import {Link} from "react-router-dom";
import "./home.css";

export default function Manager(){
 return (
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <h1>Please Select</h1>
          </li>
          <li className="list-group-item">
            <Link to="/manager" className="text-decoration-none text">
              <button className="button1">Manager</button>
            </Link>

            <Link to="/player" className="text-decoration-none text">
              <button className="button1 player">Player</button>
            </Link>
          </li>
        </div>
      </ul>
    </>
  );
}