import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  setLocation, 
  fetchShows 
} from '../../actions';
import loadingGif from '../../images/loader.gif';

import {cleanConcertData} from '../../cleaners/cleanConcertData'
import { fetchImage } from '../../cleaners/fetchImage'
import {mockFetchData} from '../../cleaners/mockFetchData'

export class LocationForm extends Component {
  constructor() {
    super()
    this.state = { 
      zipCode: '',
      radius: '',
      loading: false
    }  
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { fetchShows, setLocation, history } = this.props;
    
    fetchShows(this.state)
    setLocation(this.state);
    history.push('./main');
    this.setState({
      zipCode: '',
      radius: '',
      loading: false
    });
  };

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit} className='location-form' id={this.props.id}>
          <input 
            type='text'
            name='zipCode'
            value={this.state.zipCode}
            onChange={this.handleChange}
            placeholder='Zip-code'
          />
          <input
            type='text'
            name='radius'
            value={this.state.radius}
            onChange={this.handleChange}
            placeholder='Radius'
          />
          <button>Submit</button>
        </form>
        {
          this.state.loading && 
            <img src={ loadingGif } className='loading-gif'/>
        }
      </section>
    );
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) => (dispatch(setLocation(location))),
    fetchShows: (shows) => (dispatch(fetchShows(shows)))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LocationForm));
