import { Link } from 'react-router'
import { FaMagnifyingGlass, FaLocationDot } from 'react-icons/fa6'

function Homepage() {
  return (
    <main className="home-page">
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

          <div className="home-hero-points">
            <span>✓ Check availability</span>
            <span>✓ Find nearby pharmacies</span>
            <span>✓ Reserve before you go</span>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-visual-header">
            <div>
              <span className="home-visual-label">LIVE AVAILABILITY</span>

              <h3>Find what you need nearby</h3>
            </div>
          </div>

          <div className="home-search-preview">
            <FaMagnifyingGlass />

            <div>
              <span>Search medicine</span>
              <p>Brand name, generic name, dosage...</p>
            </div>
          </div>

          <div className="home-availability-preview">
            <div className="home-availability-title">
              <div>
                <strong>3 pharmacies nearby</strong>
                <p>Medicine availability near you</p>
              </div>

              <FaLocationDot />
            </div>

            <div className="home-availability-line">
              <span className="home-pharmacy-dot"></span>

              <div className="home-availability-info">
                <strong>0.8 km away</strong>
                <span>Available</span>
              </div>

              <span className="badge badge-success">In Stock</span>
            </div>

            <div className="home-availability-line">
              <span className="home-pharmacy-dot"></span>

              <div className="home-availability-info">
                <strong>1.4 km away</strong>
                <span>Available</span>
              </div>

              <span className="badge badge-success">In Stock</span>
            </div>

            <div className="home-availability-line">
              <span className="home-pharmacy-dot low"></span>

              <div className="home-availability-info">
                <strong>2.1 km away</strong>
                <span>Limited availability</span>
              </div>

              <span className="badge badge-warning">Low Stock</span>
            </div>
          </div>

          <div className="home-visual-footer">
            <span>Compare availability before you go</span>

            <Link to="/medicines">Explore medicines →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Homepage
