import React from "react"
import ReactDOM from "react-dom/client"
import "./assests/styles/style.css"
import "./assests/styles/embla.css"

// Importing FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';
// Importing Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Importing Bootstrap JS (optional, if you need features like modals or tooltips)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import App from "./App.js"


import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

window.bootstrap = bootstrap;


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);