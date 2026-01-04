type Message = string | NestedDictionary;
interface NestedDictionary {
  [x: string]: Message;
}
interface FlattenedDictionary {
  [x: string]: string;
}

export const flattenMessages = (
  nestedMessages: NestedDictionary,
  prefix = '',
): FlattenedDictionary => {
  // First pass: flatten all messages
  const flattened = Object.keys(nestedMessages).reduce(
    (messages: FlattenedDictionary, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix !== '' ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {},
  );

  // Second pass: resolve references (strings that reference other keys)
  // References are in the format "common.words.affected"
  // Note: Only one level of indirection is supported - common.words keys
  // should contain actual translations, not references to other keys
  const resolved: FlattenedDictionary = {};
  for (const [key, value] of Object.entries(flattened)) {
    // Check if the value is a reference to another key (but not if it IS a common.words key)
    // We check for string type explicitly to handle empty strings correctly
    if (
      !key.startsWith('common.words.') &&
      value.startsWith('common.words.') &&
      typeof flattened[value] === 'string'
    ) {
      resolved[key] = flattened[value];
    } else {
      resolved[key] = value;
    }
  }

  return resolved;
};
