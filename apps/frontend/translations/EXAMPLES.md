# Translation Usage Examples

This document provides practical examples of the improved translation structure.

## Example 1: Using Common Words

### Before (Duplication)
```json
{
  "table": {
    "FLOOD": {
      "column": {
        "NumHouAff": "Affected",
        "NumSchoAff": "Affected",
        "RubberRoAff": "Affected",
        "NumHouDam": "Damaged",
        "NumSchoDam": "Damaged",
        "RubberRoDam": "Damaged"
      }
    },
    "DROUGHT": {
      "column": {
        "FarmAff": "Affected",
        "FarmDam": "Damaged",
        "SamNabAff": "Affected",
        "SamNabDam": "Damaged"
      }
    }
  }
}
```

In this example, "Affected" appears 5 times and "Damaged" appears 4 times, just in these two sections. Across the entire file, these words are duplicated 40+ times.

### After (With Common Words)
```json
{
  "common": {
    "words": {
      "affected": "Affected",
      "damaged": "Damaged"
    }
  }
}
```

Now these words are defined once and can be referenced throughout the application.

## Example 2: Using Readable Disaster Keys

### Before (Numeric Keys Only)
```jsx
// Component code
const disasterTypes = ['1', '3', '4', '99'];

// In JSX
<FormattedMessage id={`disasters.${disasterType}`} />
// disasters.1 = "Flood"
// disasters.3 = "Storm"
// disasters.4 = "Fire"
```

**Problem**: Looking at the code, it's not immediately clear what disaster type "3" or "4" represents without checking the translation file.

### After (Readable Keys Available)
```jsx
// Component code - more readable
const disasterTypes = ['flood', 'storm', 'fire', 'other_incidents'];

// In JSX
<FormattedMessage id={`disasters.${disasterType}`} />
// disasters.flood = "Flood"
// disasters.storm = "Storm"
// disasters.fire = "Fire"
```

**Benefits**: 
- Code is self-documenting
- Easier to understand and maintain
- Less error-prone

**Note**: Numeric keys still work for backward compatibility:
```jsx
<FormattedMessage id="disasters.3" /> // Still displays "Storm"
<FormattedMessage id="disasters.storm" /> // Also displays "Storm"
```

## Example 3: Translation Consistency

### Before
Different parts of the codebase might translate the same concept differently:

```json
{
  "section1": {
    "affected_people": "Affected",
    "people_affected": "Affected",
    "affectedPeople": "Affected"
  }
}
```

### After
With common words, there's a single source of truth:

```json
{
  "common": {
    "words": {
      "affected": "Affected",
      "people": "People"
    }
  }
}
```

Developers know to check `common.words` first, ensuring consistency.

## Example 4: Adding New Translations

### Checklist for New Translations

1. **Check if the word exists in `common.words`**
   ```json
   // If you need "Affected", check common.words first
   {
     "common": {
       "words": {
         "affected": "Affected"  // ✓ Already exists!
       }
     }
   }
   ```

2. **Use readable keys for disaster types**
   ```jsx
   // ✓ Good
   <FormattedMessage id="disasters.storm" />
   
   // ✗ Avoid (but still works for compatibility)
   <FormattedMessage id="disasters.3" />
   ```

3. **Add to common.words if you find duplication**
   ```json
   // If you need to add "hospital" in multiple places:
   {
     "common": {
       "words": {
         "hospital": "Hospital",
         "hospitals": "Hospitals"
       }
     }
   }
   ```

## Impact Summary

### Before
- "Affected" appears 41 times in en.json
- "Damaged" appears 38 times in en.json
- Numeric disaster keys require lookup to understand
- 7+ duplicate disaster type definitions

### After
- "Affected" defined once in `common.words.affected`
- "Damaged" defined once in `common.words.damaged`
- Readable disaster keys (e.g., "storm", "fire") available
- Backward compatibility maintained
- Foundation for future refactoring

### File Size Savings (Potential)
- Current: ~150+ duplicate translation strings
- Future: Could reduce by ~100+ strings through refactoring
- Maintenance: One place to update instead of 40+
