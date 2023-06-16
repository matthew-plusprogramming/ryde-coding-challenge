import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

// Component imports
import {
  DialogueDateRangePicker
} from 'components/DialogueDateRangePicker/DialogueDateRangePicker';
import {
  HorizontalFlexContainer
} from 'components/HorizontalFlexContainer/HorizontalFlexContainer';
import { DateGrouping } from 'types/dateGrouping.types';

// Style imports
import {
  chartHeader,
  dateGroupSelector,
  dateRangeButton } from './DataVisualizationChartHeader.module.scss';

interface DataVisualizationChartHeaderProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  dateGrouping: DateGrouping;
  handleGroupingChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: DateGrouping
  ) => void;
  startDate: number;
  endDate: number;
  handleDateRangeChange: (startDate: number, endDate: number) => void;
}

const DataVisualizationChartHeader: React.FC<
  DataVisualizationChartHeaderProps
> = ({
  dateGrouping,
  handleGroupingChange,
  startDate,
  endDate,
  handleDateRangeChange
}) => {
  const [
    selectDateRangeOpen,
    setSelectDateRangeOpen
  ] = useState<boolean>(false);

  return (
    <HorizontalFlexContainer>
      <h2 className={chartHeader}>New Users</h2>

      <Button
        variant="outlined"
        className={dateRangeButton}
        onClick={() => {
          setSelectDateRangeOpen(true);
        }}>
      Choose Date Range
      </Button>
      <DialogueDateRangePicker
        open={selectDateRangeOpen}
        onClose={() => {
          setSelectDateRangeOpen(false);
        }}
        startDate={startDate}
        endDate={endDate}
        handleDateRangeChange={handleDateRangeChange}
      />

      <ToggleButtonGroup
        className={dateGroupSelector}
        value={dateGrouping}
        exclusive
        onChange={handleGroupingChange}
      >
        <ToggleButton value={DateGrouping.Day}>Day</ToggleButton>
        <ToggleButton value={DateGrouping.Week}>Week</ToggleButton>
        <ToggleButton value={DateGrouping.Month}>Month</ToggleButton>
      </ToggleButtonGroup>
    </HorizontalFlexContainer>
  );
};

export { DataVisualizationChartHeader };
