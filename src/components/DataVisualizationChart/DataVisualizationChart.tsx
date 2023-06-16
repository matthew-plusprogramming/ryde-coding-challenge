import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  Tooltip,
  Legend
} from 'recharts';
import {
  DATE_FORMAT
} from 'constants/dataVisualizations.constants';
import { ApiHookState } from 'hooks/useApi';
import { useRydeSignupsDataProcessor } from 'hooks/useRydeSignupsDataProcessor';
import { DateGrouping } from 'types/dateGrouping.types';
import { RydeSignupsData } from 'types/rydeSignupsData.types';

extend(utc);

export interface DataVisualizationChartProps {
  data: ApiHookState<Array<RydeSignupsData>>['data'];
  dateRange: [ number, number ];
  groupBy: DateGrouping
}

const DataVisualizationChart: React.FC<DataVisualizationChartProps> = ({
  data,
  dateRange,
  groupBy
}) => {
  const {
    formattedData,
    groupedData,
    domain,
    ticks
  } = useRydeSignupsDataProcessor({ data, dateRange, groupBy });

  const labelFormatter = (time: number): string => {
    const date = dayjs.utc(time);

    return groupBy === DateGrouping.Day ?
      date.format(DATE_FORMAT) :
      `${date.startOf(groupBy).format(DATE_FORMAT)} - \
      ${date.endOf(groupBy).format(DATE_FORMAT)}`;
  };

  return (
    <ResponsiveContainer>
      <LineChart
        data={groupBy === DateGrouping.Day ? formattedData : groupedData}
        key={`${groupBy}:${dateRange[ 0 ]}:${dateRange[ 1 ]}`}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis
          type="number"
          dataKey="date"
          domain={domain}
          tickFormatter={labelFormatter}
          ticks={ticks}
        />
        <Tooltip
          labelFormatter={labelFormatter}
        />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { DataVisualizationChart };
