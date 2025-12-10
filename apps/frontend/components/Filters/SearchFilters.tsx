import EastIcon from '@mui/icons-material/East';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { DateRange, DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { Region, RegionFilters } from './RegionFilters';

export interface SearchFormData {
  disTyps: string[];
  dateRange: DateRange;
  region: Region;
}

interface SearchFiltersProps {
  initSearchFormData: SearchFormData;
  setSearchFormData: Dispatch<SetStateAction<SearchFormData>>;
  submitButtonContent: JSX.Element;
  hideDisasterFilter?: boolean;
  extraFilters?: JSX.Element;
  /**
   * If true, automatically submits the form when disaster type changes
   * @default false
   */
  autoSubmitOnDisasterChange?: boolean;
}

/**
 * Compare arrays of strings (sorted for comparison)
 */
const areStringArraysEqual = (a: string[], b: string[]): boolean => {
  return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
};

/**
 * Compare date ranges (handling dayjs objects)
 */
const areDateRangesEqual = (
  a: SearchFormData['dateRange'],
  b: SearchFormData['dateRange'],
): boolean => {
  const aStart = a.startDate?.toISOString();
  const bStart = b.startDate?.toISOString();
  const aEnd = a.endDate?.toISOString();
  const bEnd = b.endDate?.toISOString();

  return aStart === bStart && aEnd === bEnd;
};

/**
 * Compare regions
 */
const areRegionsEqual = (
  a: SearchFormData['region'],
  b: SearchFormData['region'],
): boolean => {
  return (
    areStringArraysEqual(a.province, b.province) &&
    areStringArraysEqual(a.district, b.district) &&
    areStringArraysEqual(a.commune, b.commune)
  );
};

/**
 * Deep comparison helper for SearchFormData
 * Handles dayjs objects by comparing their ISO strings
 */
const isFormDataEqual = (a: SearchFormData, b: SearchFormData): boolean => {
  // Compare disaster types (sort arrays to handle order differences)
  if (!areStringArraysEqual(a.disTyps, b.disTyps)) {
    return false;
  }

  // Compare date range
  if (!areDateRangesEqual(a.dateRange, b.dateRange)) {
    return false;
  }

  // Compare region
  return areRegionsEqual(a.region, b.region);
};

export const SearchFilters = ({
  initSearchFormData,
  setSearchFormData,
  submitButtonContent,
  hideDisasterFilter = false,
  extraFilters,
  autoSubmitOnDisasterChange = false,
}: SearchFiltersProps): JSX.Element => {
  const theme = useTheme();
  const { control, handleSubmit, getValues } = useForm<SearchFormData>({
    defaultValues: initSearchFormData,
  });
  const intl = useIntl();

  // Track the last submitted form data
  const lastSubmittedDataRef = useRef<SearchFormData>(initSearchFormData);
  const [isDirty, setIsDirty] = useState(false);
  const previousDisasterTypeRef = useRef<string[]>(initSearchFormData.disTyps);
  const formRef = useRef<HTMLFormElement>(null);

  // Update refs when initSearchFormData changes (e.g., from URL params)
  useEffect(() => {
    lastSubmittedDataRef.current = initSearchFormData;
    previousDisasterTypeRef.current = initSearchFormData.disTyps;
  }, [initSearchFormData]);

  // Watch all form values to detect changes
  const watchedValues = useWatch({ control });

  const submitHandler = useCallback(
    (data: SearchFormData) => {
      setSearchFormData(data);
      lastSubmittedDataRef.current = data;
      setIsDirty(false);
      previousDisasterTypeRef.current = data.disTyps;
    },
    [setSearchFormData],
  );

  // Check if form is dirty (has unsaved changes)
  useEffect(() => {
    const currentValues = getValues();
    const isFormDirty = !isFormDataEqual(
      currentValues,
      lastSubmittedDataRef.current,
    );
    setIsDirty(isFormDirty);
  }, [watchedValues, getValues]);

  // Auto-submit on disaster type change if enabled
  useEffect(() => {
    if (!autoSubmitOnDisasterChange || hideDisasterFilter) {
      return;
    }

    const currentValues = getValues();
    const currentDisasterTypes = JSON.stringify(currentValues.disTyps.sort());
    const previousDisasterTypes = JSON.stringify(
      previousDisasterTypeRef.current.sort(),
    );

    // Only auto-submit when disaster type specifically changes
    if (currentDisasterTypes !== previousDisasterTypes) {
      previousDisasterTypeRef.current = currentValues.disTyps;
      // Trigger form submission
      void handleSubmit(submitHandler)();
    }
  }, [
    watchedValues,
    autoSubmitOnDisasterChange,
    hideDisasterFilter,
    getValues,
    handleSubmit,
    submitHandler,
  ]);

  const SubmitButton = (
    <Button
      sx={{
        color: isDirty ? 'white' : 'black',
        padding: 1,
        height: '2.5rem',
        ml: hideDisasterFilter ? 0 : 2,
        backgroundColor: isDirty
          ? 'var(--color_buttons_2, #d32f2f)'
          : 'var(--color_buttons_1)',
        '&:hover': {
          backgroundColor: isDirty
            ? 'var(--color_buttons_2, #d32f2f)'
            : 'var(--color_buttons_1)',
          opacity: isDirty ? 0.9 : 0.7,
        },
        transition: 'all 0.2s ease-in-out',
        boxShadow: isDirty ? '0 2px 8px rgba(211, 47, 47, 0.3)' : 'none',
      }}
      type="submit"
      title={
        isDirty
          ? intl.formatMessage({
              id: 'validation_search_params.filters_changed',
              defaultMessage: 'Filters have changed. Click to update results.',
            })
          : undefined
      }
    >
      {submitButtonContent}
      {<EastIcon style={{ marginLeft: 6, marginBottom: 2 }} />}
    </Button>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(submitHandler)}
      style={{ width: 'fit-content' }}
    >
      <Stack direction="column" gap={theme.spacing(2)} paddingLeft={2}>
        <Stack direction="row" gap={theme.spacing(5)}>
          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <Typography>
              <FormattedMessage id="validation_search_params.location" />
            </Typography>

            <Controller
              name="region"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RegionFilters value={value} onChange={onChange} />
              )}
            />
          </Stack>

          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <Typography>
              {intl.formatMessage({
                id: 'validation_search_params.date_range',
              })}
            </Typography>
            <Controller
              name="dateRange"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateRangeFilter value={value} onChange={onChange} />
              )}
            />
          </Stack>
          {hideDisasterFilter && SubmitButton}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {!hideDisasterFilter && (
            <>
              <Stack direction="row" alignItems="center" gap={theme.spacing(3)}>
                <Controller
                  name={'disTyps'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DisasterFilter value={value} onChange={onChange} />
                  )}
                />
                {extraFilters}
              </Stack>
              {SubmitButton}
            </>
          )}
        </Stack>
      </Stack>
    </form>
  );
};
