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
    process.exit(1);
  }
  
  // Check disaster keys
  const readableDisasters = ['flood', 'drought', 'storm', 'fire', 'lightning', 
                              'epidemics', 'river_bank_collapse', 'insects', 
                              'traffic_accident', 'drowning', 'collapse', 
                              'unexploded_weapon', 'shipwreck', 'other_incidents'];
  
  let enHasReadable = readableDisasters.every(key => en.disasters && en.disasters[key]);
  let kmHasReadable = readableDisasters.every(key => km.disasters && km.disasters[key]);
  
  if (enHasReadable && kmHasReadable) {
    console.log('✓ Both translations have readable disaster keys');
  } else {
    console.error('✗ Missing readable disaster keys');
    process.exit(1);
  }
  
  // Check numeric disaster keys still exist (backward compatibility)
  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '99'];
  let enHasNumeric = numericKeys.every(key => en.disasters && en.disasters[key]);
  let kmHasNumeric = numericKeys.every(key => km.disasters && km.disasters[key]);
  
  if (enHasNumeric && kmHasNumeric) {
    console.log('✓ Both translations maintain numeric disaster keys (backward compatible)');
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
