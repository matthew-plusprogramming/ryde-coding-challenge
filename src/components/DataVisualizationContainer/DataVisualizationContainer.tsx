import classnames from 'classnames';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useState
} from 'react';

// Component imports
import { ClipLoader } from 'react-spinners';
import { DataVisualizationChart } from
  'components/DataVisualizationChart/DataVisualizationChart';
import {
  DataVisualizationChartHeader
} from 'components/DataVisualizationChartHeader/DataVisualizationChartHeader';
import {
  PaddingContainer,
  PaddingSize
} from 'components/PaddingContainer/PaddingContainer';
import {
  VerticalFlexContainer
} from 'components/VerticalFlexContainer/VerticalFlexContainer';

// Hook imports
import {
  DEFAULT_END_DATE,
  DEFAULT_GROUPING,
  DEFAULT_START_DATE
} from 'constants/dataVisualizations.constants';
import { useApi } from 'hooks/useApi';
import { DateGrouping } from 'types/dateGrouping.types';
import { RydeSignupsData } from 'types/rydeSignupsData.types';

// Style imports
import {
  dataVisualizationContainer,
  chartContainer,
  spinner
} from './DataVisualizationContainer.module.scss';

// Constants imports
import { BACKEND_API_URL } from '../../constants/api.constants';


type DataVisualizationContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
>
extend(utc);

const DataVisualizationContainer: React.FC<DataVisualizationContainerProps> = (
  {
    className,
    ...props
  }
) => {
  const { data, isLoading } = useApi<Array<RydeSignupsData>>(BACKEND_API_URL);
  const [
    dateRange,
    setDateRange
  ] = useState<[number, number]>([
    dayjs.utc(DEFAULT_START_DATE).valueOf(),
    dayjs.utc(DEFAULT_END_DATE).valueOf()
  ]);
  const [
    dateGrouping,
    setDateGrouping
  ] = useState<DateGrouping>(DEFAULT_GROUPING);

  return (
    <PaddingContainer
      className={classnames(dataVisualizationContainer, className)}
      paddingSize={{
        horizontal: PaddingSize.LARGE,
        vertical: PaddingSize.LARGE
      }}
      {...props}
    >
      {
        isLoading ? (
          <ClipLoader className={spinner}/>
        ) :
          (
            <>
              <DataVisualizationChartHeader
                dateGrouping={dateGrouping}
                handleGroupingChange={(_, value) => {
                  setDateGrouping(value);
                }}
                startDate={dateRange[ 0 ]}
                endDate={dateRange[ 1 ]}
                handleDateRangeChange={(startDate, endDate) => {
                  setDateRange([ startDate, endDate ]);
                }}
              />
              <VerticalFlexContainer className={classnames(chartContainer)}>
                <DataVisualizationChart
                  data={data}
                  dateRange={dateRange}
                  groupBy={dateGrouping}
                />
              </VerticalFlexContainer>
            </>
          )
      }
    </PaddingContainer>
  );
};


export { DataVisualizationContainer };
