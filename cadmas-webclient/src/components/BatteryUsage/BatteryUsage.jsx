import React, { Component } from 'react';
import { connect } from "react-redux";
import ChartistGraph from 'react-chartist';

const mapStateToProps = (state) => {
  return {activity: state.activity };
};

class BatteryUsage extends Component {
  componentDidMount() {
   
  }
  dataSales = {
    labels: ['10min', '20min', '30min', '40min', '50min'],
    series: [
        [13.9, 13.1, 12.9, 12.0, 11.8]
    ]
};
optionsSales = {
    low: 11,
    high: 14,
    showArea: false,
    axisX: {
        showGrid: false,
    },
    lineSmooth: true,
    showLine: true,
    showPoint: false,
    fullWidth: true,
    
};
responsiveSales = [
    ['screen and (max-width: 640px)', {
        axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        }
    }]
];
  getSafe(fn, defaultVal) {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
  }
  render() {
    return <ChartistGraph data={this.dataSales} style={{height:"140px"}} type="Line" options={this.optionsSales} responsiveOptions={this.responsiveSales} />;
  }
}

export default connect(mapStateToProps)(BatteryUsage);
