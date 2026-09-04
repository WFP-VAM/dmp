const fs = require('fs');

try {
  console.log('Validating translation files...\n');
  
  // Load translation files with specific error handling
  let en, km;
  try {
    en = JSON.parse(fs.readFileSync('./en.json', 'utf8'));
  } catch (error) {
    console.error('✗ Failed to load or parse en.json:', error.message);
    process.exit(1);
  }
  
  try {
    km = JSON.parse(fs.readFileSync('./km.json', 'utf8'));
  } catch (error) {
    console.error('✗ Failed to load or parse km.json:', error.message);
    process.exit(1);
  }
  
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
  
  // Check disaster keys - extract readable keys dynamically from EN file
  // Readable keys are lowercase with underscores, numeric keys are digits only
  const enDisasterKeys = Object.keys(en.disasters || {});
  const kmDisasterKeys = Object.keys(km.disasters || {});
  
  // Define special keys that should be excluded from readable disaster validation
  // These are uppercase constants or metadata keys, not disaster type identifiers
  const EXCLUDED_KEYS = ['FLOOD', 'DROUGHT', 'INCIDENT', 'ALL_INCIDENTS', 'undefined'];
  
  // Dynamically determine readable disaster keys from EN file
  // Readable keys: lowercase with underscores (e.g., 'storm', 'river_bank_collapse')
  // Excluded: uppercase constants and special metadata keys
  const readableDisasters = enDisasterKeys.filter(key => 
    /^[a-z_]+$/.test(key) && !EXCLUDED_KEYS.includes(key)
  );
  
  // Check that all EN readable keys exist in KM
  const kmMissingReadable = readableDisasters.filter(key => !kmDisasterKeys.includes(key));
  
  if (kmMissingReadable.length === 0) {
    console.log(`✓ Both translations have ${readableDisasters.length} readable disaster keys`);
  } else {
    console.error('✗ KM missing readable disaster keys from EN');
    console.error('  Missing:', kmMissingReadable.join(', '));
    process.exit(1);
  }
  
  // Check numeric disaster keys still exist (backward compatibility)
  const enNumericKeys = enDisasterKeys.filter(k => /^\d+$/.test(k)).sort();
  const kmNumericKeys = kmDisasterKeys.filter(k => /^\d+$/.test(k)).sort();
  
  if (enNumericKeys.length > 0 && kmNumericKeys.length > 0) {
    console.log(`✓ Both translations maintain ${enNumericKeys.length} numeric disaster keys (backward compatible)`);
    
    // Verify they match (allow KM to have extra keys for regional needs)
    const enOnly = enNumericKeys.filter(k => !kmNumericKeys.includes(k));
    const kmOnly = kmNumericKeys.filter(k => !enNumericKeys.includes(k));
    
    if (enOnly.length > 0) {
      console.error('✗ EN has numeric keys not in KM:', enOnly.join(', '));
      process.exit(1);
    }
    
    if (kmOnly.length > 0) {
      console.log(`  Note: KM has ${kmOnly.length} additional numeric key(s): ${kmOnly.join(', ')}`);
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
  console.error('✗ Unexpected validation error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
