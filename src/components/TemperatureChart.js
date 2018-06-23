import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
import moment from 'moment';
import * as scale from 'd3-scale';
import {Text} from 'react-native-svg';
import {BarChart, XAxis} from 'react-native-svg-charts';
import colors from '../colors';


const TemperatureChart = ({data, selectedIndex, onPress}) => {

    const _data = data.map((object, index) => (
        {
            value: {
                mark: object.temperature.avg,
                xAccessor: moment(new Date(object.date)).format('D ddd'),
                yAccessor: object.temperature.avg.toFixed() + '\u2103'
            },
            svg: {
                fill: index === selectedIndex ? colors.accent : colors.primary,
                opacity: object.temperature.avg > 0 ? 1.0 : 0.8,
                onPress: () => onPress(index)
            }
        }
    ));

    const CUT_OFF = 20;
    const Labels = ({x, y, bandwidth, data}) => (
        data.map((object, index) => (
            <Text
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={object.value.mark < CUT_OFF ? y(object.value.mark) - 10 : y(object.value.mark) + 15}
                fontSize={14}
                fill={object.value.mark >= CUT_OFF ? 'white' : colors.text}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
            >
                {object.value.yAccessor}
            </Text>
        ))
    );

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <BarChart
                    style={styles.chart}
                    data={_data}
                    contentInset={{top: 20, bottom: 10}}
                    yAccessor={({item}) => item.value.mark}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Labels/>
                </BarChart>
            </View>
            <XAxis
                data={_data}
                scale={scale.scaleBand}
                xAccessor={({item}) => item.value.xAccessor}
                svg={{
                    fontSize: 12,
                    fill: colors.text
                }}
            />
        </View>
    )
};

TemperatureChart.propTypes = {
    data: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default TemperatureChart;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    chart: {
        flex: 1
    }
});