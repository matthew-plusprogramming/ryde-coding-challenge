import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef
} from 'react';

extend(utc);

interface DialogueDateRangePickerProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  open: boolean;
  onClose: () => void;
  startDate: number;
  endDate: number;
  handleDateRangeChange: (startDate: number, endDate: number) => void;
}

// Needs to be like this according to MUI documentation
// eslint-disable-next-line prefer-arrow-callback
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (<Slide direction="up" ref={ref} {...props} />);
});

const DialogueDateRangePicker: React.FC<DialogueDateRangePickerProps> = ({
  open,
  onClose,
  startDate,
  endDate,
  handleDateRangeChange
}) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
  >
    <DialogTitle>Select a date range</DialogTitle>
    <DialogContent>
      <DialogContentText>
            Start date:
      </DialogContentText>
      <DatePicker value={dayjs.utc(startDate)} onChange={(date) => {
        handleDateRangeChange(date?.valueOf() ?? endDate, endDate);
      }} />
      <DialogContentText>
            End date:
      </DialogContentText>
      <DatePicker value={dayjs.utc(endDate)} onChange={(date) => {
        handleDateRangeChange(startDate, date?.valueOf() ?? startDate);
      }} />
    </DialogContent>
  </Dialog>
);

export { DialogueDateRangePicker };
