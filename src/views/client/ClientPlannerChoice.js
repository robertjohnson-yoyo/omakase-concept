import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Image, Modal, Dimensions
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import {
  Colors, Sizes, Styles
} from '../../../res/Constants';

// components
import Button from '../../components/common/Button';
import Divider from '../../components/common/Divider';
import Avatar from '../../components/profile/Avatar';

/**
 * Presents three planners assigned to a newly booked event and
 * allows re-rolling of the planners.
 */
export default class ClientPlannerChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({
            showModal: false
          })}
          animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.body}>
              <Text style={[
                Styles.Header, styles.successText, styles.successHeader
              ]}>
                Yusssss!
              </Text>
              <Text style={[
                Styles.BodyText, styles.successText, styles.successBody
              ]}>
                You've been booked in for tonight. We'll send a car to pick you
                up at 5:30 PM at your place.
              </Text>
              <Button
                label="View Booking Details"
                color={Colors.Primary}
                fontColor={Colors.Text}
                onPress={Actions.clientMain} />
            </View>
            <Image
              style={styles.successImage}
              source={require('../../../res/img/success.png')} />
          </View>
        </Modal>
        <View style={styles.input}>
          <View style={styles.body}>
            <Text style={Styles.Header}>
              Meet your planners
            </Text>
            <Text style={Styles.BodyText}>
              We've selected some possible planners locally based
              on your budget and criteria. You can review them below.
            </Text>
          </View>
          <View style={styles.plannerContainer}>
            <Divider />
            <View style={styles.planners}>
              <View style={styles.planner}>
                <Avatar
                  uid="lq96kaJpFmdyikJlcuRUOqoUwjM2"
                  size={100} />
              </View>
              <View style={styles.planner}>
                <Avatar
                  uid="HOtOvx58WEgkOeOguoBs7Mu7LDe2"
                  size={100} />
              </View>
              <View style={styles.planner}>
                <Avatar
                  uid="gX1zgZbcQPh0D6yiqhKTLRygEyT2"
                  size={100} />
              </View>
            </View>
            <Divider />
          </View>
          <View style={[
            styles.body, styles.rollContainer
          ]}>
            <Button
              fontColor={Colors.Text}
              color={Colors.Primary}
              label="Roll Again (+$10)"
              icon="cached" />
            <Text style={[
              Styles.BodyText, styles.rollText
            ]}>
              You can roll a new set by adding more money to your budget.
              And don't worry, your money goes straight into your event.
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            label=" " />
          <Button
            color={Colors.Primary}
            fontColor={Colors.Text}
            onPress={() => this.setState({
              showModal: true
            })}
            label="Complete my Event Booking" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.Background
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

  rollContainer: {
    alignItems: 'center'
  },

  rollText: {
    marginTop: Sizes.InnerFrame,
    textAlign: 'center',
    fontSize: Sizes.SmallText,
    color: Colors.Disabled
  },

  plannerContainer: {
    alignSelf: 'stretch',
    backgroundColor: Colors.Foreground
  },

  planners: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizes.OuterFrame
  },

  planner: {
  },

  buttons: {
    padding: Sizes.InnerFrame,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },

  // success modal
  modalContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: Sizes.OuterFrame * 2,
    paddingLeft: Sizes.OuterFrame,
    paddingRight: Sizes.OuterFrame,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.Primary
  },

  successImage: {
    width: 350,
    height: 350
  },

  successText: {
    color: Colors.AlternateText,
    textAlign: 'center',
    marginBottom: Sizes.InnerFrame
  },

  successHeader: {
    fontSize: 32
  },

  successBody: {
    fontSize: 14
  }
});
