import React, { useCallback } from "react";
import jMoment from "moment-jalaali";
import { useInput, FieldTitle } from "ra-core";
import JalaliUtils from "@date-io/jalaali";
import { TimePicker, DateTimePicker, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    width: { width: 256 },

});

JalaliUtils.prototype.getDatePickerHeaderText = (date) => date.format("ddd, jMMMM jD");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const Picker = ({ PickerComponent, ...fieldProps }) => {
  const { options, label, source, resource, isRequired, providerOptions } = fieldProps;

  const { input } = useInput({ source });

  const handleChange = useCallback(
    (value) => (Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null)),
    [input],
  );
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider {...providerOptions} utils={JalaliUtils} locale="fa">
      <PickerComponent
        {...options}
        label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
        clearable
        showTodayButton
        okLabel="تأیید"
        cancelLabel="لغو"
        clearLabel="پاک کردن"
        todayLabel="امروز"
        labelFunc={(date) => (date ? date.format("jDD jMMMM jYYYY") : "")}
        value={input.value ? new Date(input.value) : null}
        onChange={(date) => handleChange(date)}
        inputVariant="filled"
        margin="dense"
        className={classes.width}
      />
    </MuiPickersUtilsProvider>
  );
};

export const DateInput = (props) => <Picker PickerComponent={DatePicker} {...props} />;
export const TimeInput = (props) => <Picker PickerComponent={TimePicker} {...props} />;
export const DateTimeInput = (props) => <Picker PickerComponent={DateTimePicker} {...props} />;
