const options: Highcharts.Options = {
  title: {
    text: '',
  },
  lang: {
    noData: 'No data yet',
  },
  chart: {
    backgroundColor: '#1a1a1a',
    spacing: [30, 30, 30, 30],
    height: '68%'
  },
  legend: {
    enabled: false,
  },
  responsive: {
    rules: [{
      condition: {
        minHeight: 300,
      }
    }]
  }
};

export default options;
