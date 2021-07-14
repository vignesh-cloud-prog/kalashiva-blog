import React from "react";
import link from "next/link";
import { auth } from "../firebase";
import Link from "next/link";

export default function Navbar({user}) {
  return (
    <div>
      <nav>
        <div className="nav-wrapper #311b92 deep-purple darken-4">
          <Link href="/" className="brand-logo">
            Kaalashiva
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
              {user?
              <>
              <li><Link href="createblog">Create BLog</Link></li>
              <li><button className="btn" onClick={()=>auth.signOut()}>Logout</button></li>
              </>:<>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Signup</Link></li>
              </>}
            
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
      {/* <script>
      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });
      </script> */}
    </div>
  );
}
