import { Link } from 'react-router'
import { FaUsers, FaShop } from 'react-icons/fa6'

function About() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-label">ABOUT DAWA</p>

          <h1>Making medicine easier to find.</h1>

          <p className="about-hero-text">
            Dawa helps people find available medicines across pharmacies without
            having to call multiple stores.
          </p>
        </div>
      </section>

      {/* Why Dawa */}
      <section className="about-section">
        <div className="about-container about-story">
          <div className="about-story-content">
            <p className="about-label">WHY DAWA?</p>

            <h2>A simpler way to find the medicine you need.</h2>

            <p>
              Finding a specific medicine can sometimes mean contacting several
              pharmacies just to check whether it is available.
            </p>

            <p>
              Dawa brings medicine availability into one platform, helping users
              search for medicines, discover pharmacies that have them in stock,
              and submit a reservation request.
            </p>
          </div>

          <div className="about-highlight">
            <span className="about-highlight-number">01</span>

            <h3>One place to search</h3>

            <p>
              Instead of checking pharmacies one by one, Dawa makes medicine
              availability easier to discover.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-how">
        <div className="about-container">
          <div className="about-section-heading">
            <p className="about-label">HOW IT WORKS</p>

            <h2>From search to reservation in three simple steps.</h2>
          </div>

          <div className="about-steps">
            <div className="about-step">
              <span>01</span>

              <h3>Search</h3>

              <p>Search for the medicine you need and view its information.</p>
            </div>

            <div className="about-step">
              <span>02</span>

              <h3>Compare</h3>

              <p>
                See which pharmacies have the medicine available and compare
                your options.
              </p>
            </div>

            <div className="about-step">
              <span>03</span>

              <h3>Reserve</h3>

              <p>
                Send a reservation request to your chosen pharmacy and collect
                it once it is ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Users and Pharmacies */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-section-heading">
            <p className="about-label">BUILT FOR BOTH SIDES</p>

            <h2>Connecting people with pharmacies.</h2>
          </div>

          <div className="about-audience">
            <div className="about-audience-card">
              <div className="audience-icon">
                <FaUsers />
              </div>

              <h3>For Users</h3>

              <p>
                Find medicines and choose a pharmacy based on availability and
                convenience.
              </p>

              <ul>
                <li>Search medicines</li>
                <li>Check pharmacy availability</li>
                <li>Reserve medicines</li>
                <li>Upload prescriptions when required</li>
              </ul>

              <Link to="/medicines" className="about-link">
                Browse Medicines →
              </Link>
            </div>

            <div className="about-audience-card">
              <div className="audience-icon">
                <FaShop />
              </div>

              <h3>For Pharmacies</h3>

              <p>
                Give customers better visibility into available medicines while
                managing reservations in one place.
              </p>

              <ul>
                <li>Manage medicine inventory</li>
                <li>Receive reservation requests</li>
                <li>Review prescriptions</li>
                <li>Update reservation status</li>
              </ul>

              <Link to="/sign-up" className="about-link">
                Join Dawa →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container">
          <p className="about-label">OUR MISSION</p>

          <h2>
            Helping make access to medicine in Bahrain simpler, faster and more
            convenient.
          </h2>

          <Link to="/medicines" className="btn btn-primary">
            Find a Medicine
          </Link>
        </div>
      </section>
    </main>
  )
}

export default About
