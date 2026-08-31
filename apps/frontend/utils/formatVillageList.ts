export const PRINT_VILLAGE_NAMES_VISIBLE = 1;

/** Compact village label: first names, then how many are not shown. */
export const formatVillageListWithOverflow = (
  villages: string[],
  maxVisible: number = PRINT_VILLAGE_NAMES_VISIBLE,
): string => {
  if (villages.length === 0) {
    return '';
  }

  if (villages.length <= maxVisible) {
    return villages.join(', ');
  }

  const visible = villages.slice(0, maxVisible).join(', ');
  const hiddenCount = villages.length - maxVisible;

  return `${visible} +${hiddenCount}`;
};
