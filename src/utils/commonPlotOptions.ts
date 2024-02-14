const options: Highcharts.Options = {
  title: {
    text: ''
  },
  lang: {
    noData: 'No data yet'
  },
  chart: {
    backgroundColor: '#1a1a1a',
    spacing: [30, 30, 30, 30],
    height: (9 / 18 * 100) + '%',
    reflow: true,
    zooming: {
      type: 'xy',
    },
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
    },
  },
  legend: {
    enabled: false
  },
  boost: {
    useGPUTranslations: true,
    seriesThreshold: 1
  },
};

export default options;
