import { Link } from 'react-router'
import { FaMagnifyingGlass, FaLocationDot } from 'react-icons/fa6'

function Homepage() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-label">MEDICINE AVAILABILITY MADE SIMPLE</p>

          <h1>
            Find the medicine you need,
            <span> without the search.</span>
          </h1>

          <p className="home-hero-text">
            Search medicines, check availability across pharmacies, and reserve
            what you need before you go.
          </p>

          <div className="home-hero-actions">
            <Link to="/medicines" className="btn btn-primary home-main-btn">
              <FaMagnifyingGlass />
              Find a Medicine
            </Link>

            <Link to="/pharmacies" className="btn home-secondary-btn">
              <FaLocationDot />
              Browse Pharmacies
            </Link>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-search-preview">
            <FaMagnifyingGlass />

            <div>
              <span>Search medicines</span>
              <p>Panadol, Augmentin, Ventolin...</p>
            </div>
          </div>

          <div className="home-availability-card">
            <span className="home-available-dot"></span>

            <div>
              <strong>Available nearby</strong>
              <p>Find pharmacies with your medicine in stock</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Homepage
