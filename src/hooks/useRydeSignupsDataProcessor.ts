import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  DataVisualizationChartProps
} from 'components/DataVisualizationChart/DataVisualizationChart';
import {
  NUMBER_OF_VISUALIZATION_GRAPH_TICKS
} from 'constants/dataVisualizations.constants';
import { DateGrouping } from 'types/dateGrouping.types';

interface GroupedData {
  count: number;
  date: number;
  endDate: number;
  total: number;
}
interface ProcessedData {
  formattedData: never[] | Omit<GroupedData, 'endDate'>[];
  groupedData: never[] | GroupedData[];
  domain: never[] | number[];
  ticks: never[] | number[];
}

const dataGrouper = (
  groupBy: DateGrouping
): (
  acc: Array<GroupedData>,
  datum: Omit<GroupedData, 'endDate'>,
) => GroupedData[] => (acc, datum) => {
  const currentGroupedDatum = acc[ acc.length - 1 ];
  const currentEndDate = dayjs.utc(currentGroupedDatum.endDate);
  // Check if the ends of week/month are equal to group
  if (
    !currentEndDate.endOf(groupBy).isSame(dayjs.utc(datum.date).endOf(groupBy))
  ) {
    acc.push({
      ...datum,
      endDate: datum.date
    });
  } else {
    currentGroupedDatum.total += datum.total;
    currentGroupedDatum.endDate = datum.date;
  }

  return acc;
};

const useRydeSignupsDataProcessor = ({
  data,
  dateRange,
  groupBy
}: DataVisualizationChartProps): ProcessedData => useMemo(() => {
  // Handle empty data
  if (!data) {
    return { formattedData: [], groupedData: [], domain: [], ticks: [] };
  }

  const formattedAndFilteredData = data
    .map((datum) => ({
      ...datum,
      date: dayjs.utc(datum.date).valueOf(),
      total: datum.count
    }))
    .filter((datum) =>
      datum.date >= dateRange[ 0 ] && datum.date <= dateRange[ 1 ]
    )
    .sort((a, b) => a.date - b.date);

  // This shouldn't happen given our dataset, but being robust is good
  if (formattedAndFilteredData.length === 0) {
    return { formattedData: [], groupedData: [], domain: [], ticks: [] };
  }

  // Group data by adding an end date property
  const initialAccumulator = [ {
    ...formattedAndFilteredData[ 0 ],
    endDate: formattedAndFilteredData[ 0 ].date
  } ];
  const groupedData = formattedAndFilteredData
    .reduce(dataGrouper(groupBy), [ ...initialAccumulator ])
    .map((datum, index, array) => {
      const interpolationPercentage = array.length === 1 ?
        0.5 :
        index / (array.length - 1);

      datum.date += (datum.endDate - datum.date) * interpolationPercentage;

      return datum;
    });

  const dataLength = groupedData ?
    groupedData.length :
    formattedAndFilteredData.length;

  const domain = [
    formattedAndFilteredData[ 0 ].date,
    formattedAndFilteredData[ formattedAndFilteredData.length - 1 ].date
  ];
  // Calculating proper values for the x-axis ticks and interpolation
  const interval = (
    domain[ 1 ] - domain[ 0 ]
  ) / (
    Math.min(NUMBER_OF_VISUALIZATION_GRAPH_TICKS, dataLength) - 1
  );
  const ticks = [
    ...Array(Math.min(NUMBER_OF_VISUALIZATION_GRAPH_TICKS, dataLength)).keys()
  ].map((tick) => domain[ 0 ] + (tick * interval));

  return {
    formattedData: formattedAndFilteredData,
    groupedData,
    domain,
    ticks
  };
}, [ data, dateRange, groupBy ]);

export { useRydeSignupsDataProcessor };
