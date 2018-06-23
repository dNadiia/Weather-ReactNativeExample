import React from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import moment from 'moment';
import colors from '../colors';

const DayItemView = ({model}) => {
    const date = moment(new Date(model.date)).format('D dddd');
    const temperature = model.temperature.min.toFixed() + '...' + model.temperature.max.toFixed() + '\u2103';
    return (
        <View style={styles.root}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.temperatureText}>{temperature}</Text>
            <Text style={styles.infoText}>{model.description}</Text>
            <Image style={styles.icon} source={{uri: 'http:' + model.icon}}/>
            <Text style={styles.infoText}>{`Precipitation: ${model.precipitation} %`}</Text>
            <Text style={styles.infoText}>{`Humidity: ${model.humidity} %`}</Text>
            <Text style={styles.infoText}>{`Wind: ${model.wind} km/h`}</Text>
            <Text style={styles.infoText}>{`Average: ${model.temperature.avg.toFixed()} \u2103`}</Text>
        </View>
    );
};

DayItemView.propTypes = {
    model: PropTypes.object.isRequired
};

export default DayItemView;

const styles = StyleSheet.create({
    root: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginVertical: 20
    },
    icon: {
        width: 80,
        height: 80,
        marginVertical: 5
    },
    temperatureText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 5
    },
    dateText: {
        color: colors.text,
        fontSize: 20,
        textAlign: 'center'
    },
    infoText: {
        color: colors.text,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5
    }
});