import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../images/black-woven.jpg';
import './eventDetails.css';

export const EventDetails = ({ concert }) => {
  window.scrollTo(0, 0);
  const {
    headlineArtist,
    supportArtists,
    date,
    image,
    venue,
    startTime,
    tickets,
    bio
  } = concert;

  const allSupportArtists = supportArtists.map((artist, index) => (
    <h4 className="support" key={artist + index}>
      {artist}
    </h4>
  ));

  return (
    <div>
      <article className="event-details">
        <img
          src={image ? image : defaultImage}
          onError={event => (event.target.src = defaultImage)}
          className="detail-img"
          alt="artist"
        />
        <div className="detail-right">
          <h2 className="headliner">{headlineArtist}</h2>
          <div className="detail-date">{date}</div>
          {supportArtists.length > 0 && (
            <div className="support">
              With:
              {allSupportArtists}
            </div>
          )}
          <div className="detail-venue">
            <a href={venue.url} target="_blank" rel="noopener noreferrer">
              <h4 className="venue-name">{venue.name}</h4>
            </a>
            <div className="address">
              {venue.address}, {venue.city}
            </div>
          </div>
          <div className="detail-start-time">{startTime}</div>
          {tickets && (
            <a
              href={tickets}
              className="ticket-info"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Get tickets</h4>
            </a>
          )}
        </div>
      </article>
      {bio && (
        <article className="bio-section">
          <h3>Bio:</h3>
          <p className="bio-text">{bio}</p>
        </article>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  concert: PropTypes.object
};
