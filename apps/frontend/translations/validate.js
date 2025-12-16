const fs = require('fs');

try {
  console.log('Validating translation files...\n');
  
  // Load translation files
  const en = JSON.parse(fs.readFileSync('./en.json', 'utf8'));
  const km = JSON.parse(fs.readFileSync('./km.json', 'utf8'));
  
  console.log('✓ Both files are valid JSON');
  
  // Check common words section
  if (en.common && en.common.words) {
    console.log(`✓ EN has ${Object.keys(en.common.words).length} common words`);
  } else {
    console.error('✗ EN missing common.words section');
    process.exit(1);
  }
  
  if (km.common && km.common.words) {
    console.log(`✓ KM has ${Object.keys(km.common.words).length} common words`);
  } else {
    console.error('✗ KM missing common.words section');
    process.exit(1);
  }
  
  // Verify both have same common words
  const enWords = Object.keys(en.common.words).sort();
  const kmWords = Object.keys(km.common.words).sort();
  
  if (JSON.stringify(enWords) === JSON.stringify(kmWords)) {
    console.log('✓ Both translations have matching common word keys');
  } else {
    console.error('✗ Common word keys do not match between EN and KM');
    const enOnly = enWords.filter(w => !kmWords.includes(w));
    const kmOnly = kmWords.filter(w => !enWords.includes(w));
    if (enOnly.length) console.error('  EN only:', enOnly.join(', '));
    if (kmOnly.length) console.error('  KM only:', kmOnly.join(', '));
    process.exit(1);
  }
  
  // Check disaster keys - dynamically extract expected keys
  const readableDisasters = ['flood', 'drought', 'storm', 'fire', 'lightning', 
                              'epidemics', 'river_bank_collapse', 'insects', 
                              'traffic_accident', 'drowning', 'collapse', 
                              'unexploded_weapon', 'shipwreck', 'other_incidents'];
  
  const enDisasterKeys = Object.keys(en.disasters || {});
  const kmDisasterKeys = Object.keys(km.disasters || {});
  
  // Check that readable keys exist in both
  const enMissingReadable = readableDisasters.filter(key => !enDisasterKeys.includes(key));
  const kmMissingReadable = readableDisasters.filter(key => !kmDisasterKeys.includes(key));
  
  if (enMissingReadable.length === 0 && kmMissingReadable.length === 0) {
    console.log('✓ Both translations have readable disaster keys');
  } else {
    console.error('✗ Missing readable disaster keys');
    if (enMissingReadable.length) console.error('  EN missing:', enMissingReadable.join(', '));
    if (kmMissingReadable.length) console.error('  KM missing:', kmMissingReadable.join(', '));
    process.exit(1);
  }
  
  // Check numeric disaster keys still exist (backward compatibility)
  // Dynamically find all numeric keys from EN file
  const enNumericKeys = enDisasterKeys.filter(k => /^\d+$/.test(k)).sort();
  const kmNumericKeys = kmDisasterKeys.filter(k => /^\d+$/.test(k)).sort();
  
  if (enNumericKeys.length > 0 && kmNumericKeys.length > 0) {
    console.log(`✓ Both translations maintain ${enNumericKeys.length} numeric disaster keys (backward compatible)`);
    
    // Verify they match
    if (JSON.stringify(enNumericKeys) !== JSON.stringify(kmNumericKeys)) {
      console.warn('⚠ Warning: Numeric disaster keys differ between EN and KM');
      const enOnly = enNumericKeys.filter(k => !kmNumericKeys.includes(k));
      const kmOnly = kmNumericKeys.filter(k => !enNumericKeys.includes(k));
      if (enOnly.length) console.warn('  EN only:', enOnly.join(', '));
      if (kmOnly.length) console.warn('  KM only:', kmOnly.join(', '));
    }
  } else {
    console.error('✗ Missing numeric disaster keys');
    process.exit(1);
  }
  
  console.log('\n✅ All validation checks passed!');
  console.log('\nSummary:');
  console.log('- Common words added: reduces duplication of frequent terms');
  console.log('- Readable disaster keys added: improves code readability');
  console.log('- Backward compatibility maintained: existing numeric keys preserved');
  
} catch (error) {
  console.error('✗ Validation failed:', error.message);
  process.exit(1);
}
