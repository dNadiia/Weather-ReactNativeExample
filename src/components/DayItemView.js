import React from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

const DayItemView = ({model}) => {
    const date = new Date(model.date).toLocaleDateString("en-US", {weekday: 'long', day: 'numeric'});
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        marginVertical: 5
    },
    temperatureText: {
        color: '#5091d7',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 5
    },
    dateText: {
        color: '#708090',
        fontSize: 24,
        textAlign: 'center'
    },
    infoText: {
        color: '#708090',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5
    }
});