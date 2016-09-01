import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Alert, ScrollView, Picker
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes, Styles
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';

// components
import Button from '../../components/common/Button';
import DatePicker from '../../components/common/DatePicker';
import SingleLineInput from '../../components/common/SingleLineInput';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import NumberPicker from '../../components/common/NumberPicker';
import SwitchInput from '../../components/common/SwitchInput';
import PickerField from '../../components/common/PickerField';

/**
 * First screen of creating an event
 * client to enter basic info:
 * date, # of people, time, area, budget, occasion
 */
export default class ClientCreate extends Component {
  constructor(props){
    super(props);

    // bind methods
    this.submit = this.submit.bind(this);
  }

  submit() {
    Alert.alert(
      'Please confirm this Booking',
      `You are authorizing $${this._price.val() * this._party.val()} `
      + `on your credit card for ${this._date.val().toLocaleDateString()}`
      + `, at ${this._time.val().toLocaleTimeString()} for a `
      + `party of ${this._party.val()}.`,
      [
        {
          text: 'I need to make changes'
        },
        {
          text: 'Confirm Booking',
          onPress: () => {
            Database.ref('bookings').push({
              createdBy: Firebase.auth().currentUser.uid,
              requestedTime: (new Date(
                this._date.val().getUTCFullYear(),
                this._date.val().getUTCMonth(),
                this._date.val().getUTCDate(),
                this._time.val().getUTCHours(),
                this._time.val().getUTCMinutes()
              )).valueOf(),
              occasion: this._occasion.val(),
              contributions: {
                [Firebase.auth().currentUser.uid]: {
                  budget: this._price.val() * this._party.val(),
                  party: this._party.val(),
                  exceptions: this._restrictions.val()
                }
              }
            }, error => Actions.clientPlannerChoice());
          }
        }
      ]
    );
  }

  render() {
    return (
      <ScrollView><View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.body}>
            <Text style={Styles.Header}>
              Book a new Event
            </Text>
            <Text style={Styles.BodyText}>
              Give us a little information about your event and
              we'll pair you up with a local event planner to figure
              out the rest.
            </Text>
          </View>
          <InputSectionHeader
            label="Schedule" />
          <DatePicker
            isTop
            ref={ref => this._date = ref}
            label="Date" />
          <DatePicker
            label="Time"
            ref={ref => this._time = ref}
            type="time" />
          <PickerField
            isBottom
            label="Occasion"
            ref={ref => this._occasion = ref}
            subtitle="Tell us how we should plan your night"
            defaultVal="Chill">
            <Picker.Item label="Birthday" value="Birthday" />
            <Picker.Item label="Anniversay" value="Anniversay" />
            <Picker.Item label="Family Reunion" value="Family Reunion" />
            <Picker.Item label="Graduation" value="Graduation" />
            <Picker.Item label="Chill" value="Chill" />
          </PickerField>

          <InputSectionHeader
            label="Party Details" />
          <NumberPicker
            isTop
            number={60}
            min={20}
            label="Price"
            ref={ref => this._price = ref}
            subtitle="Per person (in CAD$)" />
          <NumberPicker
            number={2}
            min={1}
            ref={ref => this._party = ref}
            label="# of People" />
          <SingleLineInput
            isBottom
            ref={ref => this._restrictions = ref}
            label="Dietary Restrictions & Allergies" />

          <InputSectionHeader
            label="Terms & Conditions" />
          <SwitchInput
            isTop
            isBottom
            label="I Accept"
            subtitle="http://omakase.com/tos" />
        </View>
        <View style={styles.buttons}>
          <Button
            label=" " />
          <Button
            color={Colors.Primary}
            fontColor={Colors.AlternateText}
            onPress={this.submit}
            label="Book & View Assigned Planners" />
        </View>
      </View></ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.Secondary
  },

  input: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  body: {
    paddingTop: Sizes.InnerFrame,
    paddingBottom: Sizes.InnerFrame
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  }
});
