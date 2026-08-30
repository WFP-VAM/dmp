import { Stack, Typography, useTheme } from '@mui/material';
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

import { DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { RegionFilters } from './RegionFilters';
import { SubmitButton } from './SubmitButton';
import { isFormDataEqual } from './searchFormUtils';
import { SearchFormData } from './types';

export type { SearchFormData };

interface SearchFiltersProps {
  initSearchFormData: SearchFormData;
  setSearchFormData: Dispatch<SetStateAction<SearchFormData>>;
  submitButtonContent: JSX.Element;
  hideDisasterFilter?: boolean;
  extraFilters?: JSX.Element;
  topRight?: JSX.Element;
  /**
   * If true, automatically submits the form when disaster type changes
   * @default false
   */
  autoSubmitOnDisasterChange?: boolean;
}

export const SearchFilters = ({
  initSearchFormData,
  setSearchFormData,
  submitButtonContent,
  hideDisasterFilter = false,
  extraFilters,
  topRight,
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
  const handleAutoSubmit = useCallback(() => {
    if (!autoSubmitOnDisasterChange || hideDisasterFilter) {
      return;
    }

    const currentValues = getValues();
    const currentDisasterTypes = JSON.stringify(currentValues.disTyps.sort());
    const previousDisasterTypes = JSON.stringify(
      previousDisasterTypeRef.current.sort(),
    );

    if (currentDisasterTypes !== previousDisasterTypes) {
      previousDisasterTypeRef.current = currentValues.disTyps;
      void handleSubmit(submitHandler)();
    }
  }, [
    autoSubmitOnDisasterChange,
    hideDisasterFilter,
    getValues,
    handleSubmit,
    submitHandler,
  ]);

  useEffect(() => {
    handleAutoSubmit();
  }, [watchedValues, handleAutoSubmit]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(submitHandler)}
      style={{ width: '100%', minWidth: 0, maxWidth: '100%' }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={theme.spacing(2)}
        paddingLeft={2}
      >
        <Stack direction="column" gap={theme.spacing(2)} minWidth={0} flex={1}>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={theme.spacing(2)}
            alignItems="center"
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={theme.spacing(2)}
              alignItems="center"
            >
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
            <Stack
              direction="row"
              flexWrap="nowrap"
              gap={theme.spacing(2)}
              alignItems="center"
              flexShrink={0}
            >
              <Typography noWrap>
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
          </Stack>
          {!hideDisasterFilter && (
            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              gap={theme.spacing(2)}
            >
              <Controller
                name={'disTyps'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DisasterFilter value={value} onChange={onChange} />
                )}
              />
              {extraFilters}
            </Stack>
          )}
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-end"
          alignSelf="stretch"
          justifyContent={topRight != null ? 'space-between' : 'flex-end'}
          gap={theme.spacing(2)}
          flexShrink={0}
          ml="auto"
        >
          {topRight}
          <SubmitButton
            isDirty={isDirty}
            submitButtonContent={submitButtonContent}
            hideDisasterFilter={hideDisasterFilter}
            intl={intl}
          />
        </Stack>
      </Stack>
    </form>
  );
};
