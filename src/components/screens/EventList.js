import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import EventDetail from '../EventDetail';

class EventList extends Component {

  state = { events: [] };

  componentWillMount() {
    axios.get('https://salsago-d79b9.firebaseio.com/events.json')
      .then((response) => {
        const arr = [];
        for (const i in response.data) {
          arr.push(response.data[i]);
        }
        this.setState({ events: arr })
      });
  }

  renderEvents() {
    /*const eventDetails = [];

    this.state.events.forEach(function (detail) {
      eventDetails.push(detail);
      console.log(this.eventDetails);
    })*/

    return this.state.events.map(event =>
      <EventDetail key={event.title} event={event} />
    );
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView>
        {this.renderEvents()}
      </ScrollView>
    );
  }
}

export default EventList;
