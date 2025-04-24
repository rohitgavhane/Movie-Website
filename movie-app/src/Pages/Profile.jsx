import React from 'react';
import '../Components/Profile.css'
import Logo from '../assets/Logo.png'; // 🟡 Adjust the path as needed

function Profile() {
  return (
    <div className="profile-container">
          <h1 className="profile-title">🚀 My Journey Building a MERN Stack Movie App</h1>

      <div className="profile-content">
        <p>
          When I first started this project, I just wanted to build something cool with React...
        </p>

        <section>
          <h2 className="profile-subtitle">🎬 The Beginning: Just Me, a Movie API, and a Curious Mind</h2>
          <p>
            I kicked things off by integrating a movie API to fetch data...
          </p>
        </section>

        <section>
          <h2 className="profile-subtitle">😅 The Struggles Were Real</h2>
          <p>
            No project is complete without a few roadblocks...
          </p>
        </section>

        <section>
          <h2 className="profile-subtitle">💡 What I Learned (And Why It Mattered)</h2>
          <ul>
            <li><strong>React:</strong> Components, routing, hooks like <code>useEffect</code>, and state.</li>
            <li><strong>Node.js & Express:</strong> Routing, structure, and MongoDB integration.</li>
            <li><strong>MongoDB:</strong> Storing and retrieving movie/review data with models.</li>
            <li><strong>User Reviews:</strong> Modals for adding/deleting reviews with star ratings.</li>
            <li><strong>UI/UX:</strong> Responsive design, hover effects, and a custom logo.</li>
          </ul>
        </section>

        <section>
          <h2 className="profile-subtitle">🔍 Behind the Scenes: What Makes It Special</h2>
          <ul>
            <li>Dynamic search with filtering</li>
            <li>Star rating system</li>
            <li>Responsive frontend</li>
            <li>Pagination</li>
            <li>Movie categories like “Recommended”</li>
          </ul>
        </section>

        <section>
          <h2 className="profile-subtitle">🌱 Growth Beyond Code</h2>
          <p>
            This project helped me gain confidence, debug under pressure, and build something from scratch.
          </p>
        </section>

        <section>
          <h2 className="profile-subtitle">🌐 Ready for the World</h2>
          <p>
            I’m preparing to host this project as a portfolio website...
          </p>
        </section>
      </div>
    </div>
  );
}

export default Profile;
