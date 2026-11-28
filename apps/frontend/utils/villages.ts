// Kobo village codes drop the leading zero for provinces 01-09
// (e.g. 1020101 for commune 010201), while commune codes keep it.
// Padding both to their full length makes the prefix check work everywhere.
const COMMUNE_CODE_LENGTH = 6;
const VILLAGE_CODE_LENGTH = 8;

export const isVillageInCommune = (village: string, commune: string) =>
  village
    .padStart(VILLAGE_CODE_LENGTH, '0')
    .startsWith(commune.padStart(COMMUNE_CODE_LENGTH, '0'));

// Villages of the selected communes, plus any already selected village that
// cannot be matched (unknown code, data inconsistency), so it is never dropped
// silently from the form state.
export const getVillageOptions = (
  allVillages: string[],
  selectedCommunes: string[],
  selectedVillages: string[] = [],
) => {
  const options = allVillages.filter(village =>
    selectedCommunes.some(commune => isVillageInCommune(village, commune)),
  );
  const unmatched = selectedVillages.filter(
    village => !options.includes(village),
  );

  return [...options, ...unmatched];
};
