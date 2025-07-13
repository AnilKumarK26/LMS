import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Make sure to import the CSS
import LeftNav from "../Navbar"; // Import your LeftNav component

class CollaborativeLearning extends Component {
    render() {
        return (
            <div className="main-container">
                <LeftNav />
                <div className="cl-container">
                    <h1>Collaborative Learning</h1>
                    <Link to="/notes-list" style={{ textDecoration: "none" }}>
                        <div className="card">
                            <h1>Notes Sharing Portal</h1>
                            <p>Share your notes or acquire knowledge from shared notes</p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default CollaborativeLearning;
