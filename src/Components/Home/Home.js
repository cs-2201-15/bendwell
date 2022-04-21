import { useNavigate } from "react-router-dom";
import StretchGraphic from "../StretchGraphic/StretchGraphic";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="home__landing">
        <img
          src="landing-stretch.png"
          alt="stretch_img"
          className="home__landing-img"
        ></img>
        <div className="home__landing-content">
          <div className="home__landing-content-text">
            <h1>
              <span>Personalized</span> stretch routines for the modern age.
            </h1>
          </div>
          <div className="home__landing-content-button">
            <button
              onClick={() => {
                navigate("/stretches");
              }}
            >
              Start Stretching
            </button>
          </div>
        </div>
      </section>

      <section className="home__info">
        {/* <img src="Frame.png" alt="woman_stretch" className="home__info-img" /> */}
        <StretchGraphic />

        <div className="home__info-tag">
          <h2>
            Say goodbye to stiff necks and aching backs, and say hello to
            <span> feel-good routines</span> right from your chair.
          </h2>
        </div>
        <div className="home__info-details">
          <div className="home__info-details-cards">
            <h2>reduce fatigue</h2>
            <p>increase blood supply and nutrients to your muscles</p>
          </div>
          <div className="home__info-details-cards">
            <h2>improve posture</h2>
            <p>allow muscle tissues to realign and reduce built-up tension</p>
          </div>
          <div className="home__info-details-cards">
            <h2>ease stress</h2>
            <p>
              give your body and mind the space to breathe, relax, and refocus
            </p>
          </div>
        </div>
      </section>

      <section className="home__about">
        <div className="home__about-title">
          stretch at the comfort of your desk
        </div>
        <div className="home__about-description">
          bendwell helps you stretch accurately using a machine learning based
          algorithm to guide you through customizable routines
        </div>
        <div className="home__about-list">
          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>10+ Stretches</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Camera Guided Correction</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>No Equipment Needed</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Low Time Commitment</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Fits your needs</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Made for Everyone</p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>Written & Visual Instructions</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
