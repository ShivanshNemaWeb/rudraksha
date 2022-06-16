import React from 'react'
import "./NavNew.css"

function NavNew() {
    return (
        <div>

            <navf class="navfbar">
                <label class="navfbar-toggle" id="js-navfbar-toggle" for="chkToggle">
                    <i class="fa fa-bars"></i>
                </label>
                <a href="#" class="logo">logo</a>
                <input type="checkbox" id="chkToggle"></input>
                <ul class="main-navf" id="js-menu">
                    <li>
                        <a href="#" class="navf-links">Home</a>
                    </li>
                    <li>
                        <a href="#" class="navf-links">Products</a>
                    </li>
                    <li>
                        <a href="#" class="navf-links">About Us</a>
                    </li>
                    <li>
                        <a href="#" class="navf-links">Contact Us</a>
                    </li>
                    <li>
                        <a href="#" class="navf-links">Blog</a>
                    </li>
                </ul>
            </navf>
        </div>
    )
}

export default NavNew
