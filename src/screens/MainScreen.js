import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';

import colors from '../colors';
import {actionGetWeather} from '../actions/weather'
import DayItemView from '../components/DayItemView';
import TemperatureChart from '../components/TemperatureChart';

class MainScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            range: [{label: '2 Days', value: 2}, {label: '5 Days', value: 5}, {label: 'Week', value: 7}],
            selectedRangeValue: 2,
            selectedDayIndex: 0
        };
    }

    componentDidMount() {
        this.props.getWeather('Paris');
    }

    render() {
        const {location, forecast, loading} = this.props;
        const {range, selectedRangeValue, selectedDayIndex} = this.state;
        if (loading === false && forecast.length > 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.head}>
                        <Text style={styles.headTitle}>{`${location.city}, ${location.country}`}</Text>
                    </View>
                    <View>
                        <FlatList
                            ref={(ref) => {
                                this.flatListRef = ref;
                            }}
                            data={forecast}
                            horizontal={true}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.date}
                            renderItem={({item}) => <DayItemView model={item}/>}
                        />
                    </View>
                    <TemperatureChart
                        data={forecast.slice(0, selectedRangeValue)}
                        selectedIndex={selectedDayIndex}
                        onPress={this._onChartItemPress}
                    />
                    <View style={styles.segment}>
                        <SwitchSelector
                            options={range}
                            initial={0}
                            backgroundColor={colors.primary}
                            buttonColor={colors.accent}
                            textColor='#eee'
                            onPress={this._onSwitchSelectorPress}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.progress}>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }

    _onChartItemPress = (index) => {
        this.setState({selectedDayIndex: index});
        this.flatListRef.scrollToIndex({animated: true, index});
    }

    _onSwitchSelectorPress = (value) => {
        this.setState({selectedDayIndex: 0, selectedRangeValue: value});
        this.flatListRef.scrollToIndex({animated: false, index: 0});
    }
}

MainScreen.propTypes = {
    location: PropTypes.object,
    forecast: PropTypes.array,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        location: state.weather.location,
        forecast: state.weather.forecast,
        loading: state.weather.loading,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getWeather: (q: String) => {
        dispatch(actionGetWeather(q));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    headTitle: {
        color: colors.text,
        fontSize: 22,
        textAlign: 'center'
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    segment: {
        marginHorizontal: 20,
        marginVertical: 15
    }
});