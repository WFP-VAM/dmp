# Translation Files Structure

## Overview

The translation files (`en.json` and `km.json`) contain all user-facing text for the DMP application in English and Khmer respectively.

## Common Words

To reduce duplication and improve maintainability, we've created a `common.words` section that contains frequently used terms:

```json
{
  "common": {
    "words": {
      "yes": "Yes",
      "no": "No",
      "affected": "Affected",
      "damaged": "Damaged",
      "missing": "Missing",
      "dead": "Dead",
      "evacuated": "Evacuated",
      "men": "Men",
      "women": "Women",
      "children": "Children",
      "elderly": "Elderly",
      "disabled": "Disabled",
      "families": "Families",
      "people": "People",
      "total": "Total",
      "injured": "Injured",
      "relocated": "Relocated",
      "length": "Length",
      "width": "Width",
      "depth": "Depth",
      "schools": "Schools",
      "number": "Number"
    }
  }
}
```

### Usage Example

Instead of duplicating translations:

```jsx
// ❌ Old way - duplicated in translation file
// Translation file has "Affected" repeated 40+ times:
{
  "table": {
    "FLOOD": {
      "column": {
        "NumHouAff": "Affected",
        "NumSchoAff": "Affected",
        "RubberRoAff": "Affected",
        // ... 37 more times
      }
    }
  }
}
```

The existing code will continue to work, but the common words section now provides a centralized place for these repeated terms. Future enhancements could refactor the code to compose translations using common words:

```jsx
// ✅ Potential future improvement - compose translations
// Instead of: <FormattedMessage id="table.FLOOD.column.NumHouAff" /> // "Affected"
// Could use: <FormattedMessage id="common.words.affected" /> // "Affected"
```

**Note**: The current implementation maintains all existing translation keys for backward compatibility. The `common.words` section serves as:
1. A reference for developers when adding new translations
2. A foundation for future refactoring to reduce duplication
3. A way to ensure consistency across translations

## Disaster Types

Disaster types are now available in both numeric and readable formats:

### Numeric Keys (Legacy - Maintained for Backward Compatibility)
```json
{
  "disasters": {
    "1": "Flood",
    "2": "Drought",
    "3": "Storm",
    "4": "Fire",
    "5": "Lightning",
    "6": "Epidemics",
    "7": "River Bank Collapse",
    "8": "Insects",
    "9": "Traffic Accident",
    "10": "Drowning",
    "11": "Collapse",
    "12": "Unexploded Weapon",
    "13": "Shipwreck",
    "99": "Other Incidents"
  }
}
```

### Readable Keys (Recommended for New Code)
```json
{
  "disasters": {
    "flood": "Flood",
    "drought": "Drought",
    "storm": "Storm",
    "fire": "Fire",
    "lightning": "Lightning",
    "epidemics": "Epidemics",
    "river_bank_collapse": "River Bank Collapse",
    "insects": "Insects",
    "traffic_accident": "Traffic Accident",
    "drowning": "Drowning",
    "collapse": "Collapse",
    "unexploded_weapon": "Unexploded Weapon",
    "shipwreck": "Shipwreck",
    "other_incidents": "Other Incidents"
  }
}
```

### Usage Example

```jsx
// Both work, but readable keys are preferred for new code
<FormattedMessage id="disasters.3" /> // "Storm"
<FormattedMessage id="disasters.storm" /> // "Storm" - More readable
```

## Benefits

1. **Reduced Duplication**: Common words like "Affected" and "Damaged" appear once instead of 40+ times
2. **Easier Maintenance**: Update a common word in one place instead of multiple locations
3. **Better Readability**: Using `disasters.storm` is more intuitive than `disasters.3`
4. **Consistency**: Ensures the same word is translated consistently across the application
5. **Smaller File Size**: Less redundant data in translation files

## Migration Guide

When adding new translations:

1. **Check `common.words` first**: If the word you need exists there, use it
2. **Use readable keys**: For disaster types, prefer `disasters.storm` over `disasters.3`
3. **Add to common words**: If you find yourself duplicating a word multiple times, consider adding it to `common.words`

## File Structure

```
translations/
├── README.md           # This file
├── en.json            # English translations
├── km.json            # Khmer (Cambodian) translations
├── communes.json      # Commune location data
├── villages.json      # Village location data
└── geodata/
    ├── communes.json  # Geodata for communes
    ├── districts.json # Geodata for districts
    └── provinces.json # Geodata for provinces
```

## Contributing

When adding new translations:

1. Always update both `en.json` and `km.json`
2. Maintain alphabetical order where possible
3. Use clear, descriptive keys
4. Reuse `common.words` entries to avoid duplication
5. Test that your translations display correctly in both languages
