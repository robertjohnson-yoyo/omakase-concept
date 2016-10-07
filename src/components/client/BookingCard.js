import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, Dimensions, TouchableHighlight
} from 'react-native';
import {
  Colors
} from '../../../res/Constants';
import DateFormat from 'dateformat';

import Button from '../common/Button';


/**
 * Booking Card Component for bookings
 */
export default class BookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.booking ? this.props.booking : {
        // Defaults for testing
        ocassion: 'Party Time',
        confirmed: true,
        // TODO: handle number -> date conversion
        requestedTime: 'October 21st, 7:30PM',
        // TODO: this should be computed
        description: 'You have requested a booking for Party Time, with 4 people at 7:30PM on October 21st.'
      }
    };
  }

  componentDidMount() {
    // Compute display values
    if (this.props.booking) {
      let booking = this.props.booking;


      let details = `budget of XXX`;
      booking.description = `You have requested a booking for ` +
        `${booking.city.name}, with  ` +
        `people. Including a ${details}.`;
      booking.requestedTime = DateFormat(new Date(booking.requestedTime),
        'mmmm dS, h:MMTT');

      if (booking.confirmed) {
        booking.statusColor = '#008BBA'
        booking.statusText = 'Confirmed'
      } else if (booking.finalized) {
        booking.statusColor = '#00A03E'
        booking.statusText = 'Completed'
      }
      this.setState({booking: booking});
    }
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardIntro}>
          <Text style={[styles.cardText, styles.cardTitleText]}>
          {
            this.state.booking.requestedTime
              ? "Booking on " + this.state.booking.requestedTime
              : 'Card Title'
          }
          </Text>
        </View>
        <View style={styles.cardDetails}>
          <Text style={[styles.cardText, styles.cardDetailsTextDesc]}>
          {
            this.state.booking.description ? this.state.booking.description : 'Card Description'
          }
          </Text>
        </View>
        <View style={styles.cardActions}>
          <View style={styles.cardActionsButtons}>
            <Button label="DETAILS" fontColor="#3F51B5"/>
            <Button label="CANCEL" fontColor="#DB2D6D"/>
          </View>
          <View style={[styles.cardStatus, {backgroundColor: this.state.booking.statusColor ? this.state.booking.statusColor : Colors.Primary}]}>
            <Text style={styles.cardStatusText}>
              {
                this.state.booking.statusText ? this.state.booking.statusText : 'In Progress'
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    marginTop: 10,
  },
  cardIntro: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardDetails: {
    flex: 1,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 15
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    // justifyContent: 'center',
    height: 30,
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
  },
  cardActionsButtons: {
    flex: 1,
    flexDirection: 'row'
  },
  cardStatus: {
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 10,
    // padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderColor: Colors.Transparent,
    borderWidth: 1,
  },

  cardText: {
    color: Colors.White,
    fontSize: 10
  },
  cardTitleText: {
    fontSize: 16
  },
  cardDetailsTextDesc: {
    color: 'black'
  },
  cardStatusText: {
    color: Colors.White
  }
});
