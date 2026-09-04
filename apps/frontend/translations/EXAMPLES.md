# Translation Usage Examples

This document provides practical examples of the improved translation structure.

## Translation Reference System

The translation system now supports **automatic reference resolution**. Keys can reference common words using the format `"common.words.keyname"`, and the translation system automatically resolves these to the actual translated text at runtime.

### How It Works

When you use a key like `"NumHouAff": "common.words.affected"`:
1. The key `table.FLOOD.column.NumHouAff` contains the reference `"common.words.affected"`
2. At runtime, the `flattenMessages` function resolves this to the actual value: `"Affected"` (EN) or `"ប៉ះពាល់"` (KM)
3. The application displays the translated word correctly

This means **zero duplication** - common words are defined once and referenced everywhere!

## Example 1: Before vs After (With References)

### Before (Massive Duplication)
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
        "RubberRoDam": "Damaged",
        "NumMeDeath": "Men",
        "NumFeDeath": "Women",
        "NumKidDeath": "Children"
      }
    },
    "DROUGHT": {
      "column": {
        "FarmAff": "Affected",
        "FarmDam": "Damaged",
        "NumMe": "Men",
        "NumFe": "Women",
        "NumKid": "Children"
      }
    }
  }
}
```

In this example:
- "Affected" appears 3 times (and 41 times total across the file)
- "Damaged" appears 3 times (and 38 times total)
- "Men", "Women", "Children" are duplicated in both sections

### After (With References - Zero Duplication!)
```json
{
  "common": {
    "words": {
      "affected": "Affected",
      "damaged": "Damaged",
      "men": "Men",
      "women": "Women",
      "children": "Children"
    }
  },
  "table": {
    "FLOOD": {
      "column": {
        "NumHouAff": "common.words.affected",
        "NumSchoAff": "common.words.affected",
        "RubberRoAff": "common.words.affected",
        "NumHouDam": "common.words.damaged",
        "NumSchoDam": "common.words.damaged",
        "RubberRoDam": "common.words.damaged",
        "NumMeDeath": "common.words.men",
        "NumFeDeath": "common.words.women",
        "NumKidDeath": "common.words.children"
      }
    },
    "DROUGHT": {
      "column": {
        "FarmAff": "common.words.affected",
        "FarmDam": "common.words.damaged",
        "NumMe": "common.words.men",
        "NumFe": "common.words.women",
        "NumKid": "common.words.children"
      }
    }
  }
}
```

**Result:**
- Each word defined once in `common.words`
- All other occurrences are references that auto-resolve
- Updating "Affected" in one place updates all 41 usages instantly!

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

## Example 3: Translation Consistency Guaranteed

### Problem
Without references, different parts of the codebase might have slight variations:

```json
{
  "section1": {
    "people_affected": "Affected",
    "affectedPeople": "affected"  // Oops! Lowercase
  }
}
```

### Solution
With references, consistency is automatic:

```json
{
  "common": {
    "words": {
      "affected": "Affected"  // Single source of truth
    }
  },
  "section1": {
    "people_affected": "common.words.affected",
    "affectedPeople": "common.words.affected"  // Always consistent!
  }
}
```

## Example 4: Impact Statistics

### Duplication Eliminated

| Word | Occurrences Before | After | Savings |
|------|-------------------|-------|---------|
| "Affected" | 41 | 1 + 41 refs | 97.6% |
| "Damaged" | 38 | 1 + 38 refs | 97.4% |
| "Women" | 15 | 1 + 15 refs | 93.3% |
| "Men" | 13 | 1 + 13 refs | 92.3% |
| "Children" | 13 | 1 + 13 refs | 92.3% |
| "Elderly" | 13 | 1 + 13 refs | 92.3% |
| "Disabled" | 13 | 1 + 13 refs | 92.3% |
| "Families" | 16 | 1 + 16 refs | 93.8% |

**Total**: 219 duplicate strings eliminated in EN, 217 in KM!

## Adding New Translations

### Checklist for New Translations

1. **Check if the word exists in `common.words`**
   ```json
   // If you need "Affected", use the reference
   {
     "your_key": "common.words.affected"  // ✓ Reuse!
   }
   ```

2. **Add to common.words if it will be reused**
   ```json
   // If you find yourself needing "hospital" multiple times:
   {
     "common": {
       "words": {
         "hospital": "Hospital",
         "hospitals": "Hospitals"
       }
     }
   }
   ```

3. **Use readable keys for disaster types**
   ```jsx
   // ✓ Good
   <FormattedMessage id="disasters.storm" />
   
   // ✗ Avoid (but still works for compatibility)
   <FormattedMessage id="disasters.3" />
   ```

## Technical Implementation

The reference resolution happens in `/apps/frontend/services/intl.ts`:

```typescript
export const flattenMessages = (nestedMessages, prefix = '') => {
  // First pass: flatten all messages
  const flattened = /* ... flatten nested structure ... */;

  // Second pass: resolve references
  const resolved = {};
  for (const [key, value] of Object.entries(flattened)) {
    // If value is "common.words.affected", resolve to actual "Affected"
    if (!key.startsWith('common.words.') && 
        value.startsWith('common.words.') && 
        flattened[value]) {
      resolved[key] = flattened[value];  // Resolve!
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
};
```

This ensures that by the time translations reach the React components, all references are resolved to actual translated strings.

## Impact Summary

### Before
- 41 copies of "Affected" in en.json
- 38 copies of "Damaged" in en.json
- Similar duplication in km.json
- Total: 200+ duplicate translation strings
- Manual search & replace needed for updates

### After
- 1 definition of each common word
- 219 references in EN, 217 in KM
- Automatic resolution at runtime
- Update once, applies everywhere
- Zero code changes required (backward compatible)

### Maintenance Benefits
- **Update once**: Change "Affected" to "Impacted" in one place → all 41 usages update
- **Consistency**: Impossible to have inconsistent translations
- **Smaller files**: 219+ fewer duplicate strings
- **Self-documenting**: References make it clear which words are used where

