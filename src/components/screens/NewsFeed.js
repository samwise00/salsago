import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import NewsDetail from '../NewsDetail';

class NewsFeed extends Component {
  static navigationOptions = {
    title: 'News',
  }

  state = { events: [] };

  componentWillMount() {
    this.fetchNews();
  }

  fetchNews() {
    axios.get('https://salsago-d79b9.firebaseio.com/events.json')
      .then((response) => {
        const arr = [];
        for (const i in response.data) {
          arr.push(response.data[i]);
        }
        this.setState({ events: arr });
      });
  }

  renderEvents() {
    /*const eventDetails = [];

    this.state.events.forEach(function (detail) {
      eventDetails.push(detail);
      console.log(this.eventDetails);
    })*/

    return this.state.events.map(event =>
      <NewsDetail key={event.title} event={event} />
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

export default NewsFeed;
