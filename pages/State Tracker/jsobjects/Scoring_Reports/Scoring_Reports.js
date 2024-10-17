export default {
import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// There should not be negative values in rawData
const rawData = [
  [0, 231, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [231, 231, 0, 0, 0, 0]
];
const totalData = [];
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0;
  for (let j = 0; j < rawData.length; ++j) {
    sum += rawData[j][i];
  }
  totalData.push(sum);
}
const grid = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 50
};
const series = ['Pending', 'In Progress', 'Needs Review', 'Complete'].map(
  (name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  }
);
option = {
  legend: {
    selectedMode: false
  },
  grid,
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: [
      'Analytics',
      'Grants',
      'Negotiation',
      'Project Manager',
      'States',
      'Technical'
    ]
  },
  series
};
console.log(option);

option && myChart.setOption(option);


}