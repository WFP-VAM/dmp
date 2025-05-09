process.env.ALLOWED_HOST = 'https://test.example.com';

import { FloodDto, DroughtDto, IncidentDto, DisasterType, FLOOD, DROUGHT, INCIDENT } from '@wfp-dmp/interfaces';
import { generateTelegramMessage } from '../telegram';
import { floodMock } from '../../kobo/tests/__mocks__/flood';
import { droughtMock } from '../../kobo/tests/__mocks__/drought';
import { incidentMock } from '../../kobo/tests/__mocks__/incident';

describe('Telegram message generation', () => {
  beforeEach(() => {
    // Mock console.log to check logged values
    jest.spyOn(console, 'log').mockImplementation();
    // Set environment variable needed for tests
    process.env.ALLOWED_HOST = 'https://test.example.com';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate telegram message for flood disaster', () => {
    const message = generateTelegramMessage(FLOOD, floodMock as FloodDto);
    console.warn('Flood Telegram Message: \n\n', message);
    
    // Check required fields are present
    expect(message).toContain('ថ្ងៃកើតហេតុ');
    expect(message).toContain('[ភ្ជាប់ទៅគេហទំព័រ]');
    
    // Check for affected people section
    expect(message).toContain('ប៉ះពាល់:');
    expect(message).toContain('36');  // Look for the number 36 which is NumPeoAff
  });

  it('should generate telegram message for drought disaster', () => {
    const message = generateTelegramMessage(DROUGHT, droughtMock as DroughtDto);
    console.warn('Drought Telegram Message: \n\n', message);
    
    expect(message).toContain('ថ្ងៃកើតហេតុ');
    expect(message).toContain('[ភ្ជាប់ទៅគេហទំព័រ]');
    
    // Check for affected people section
    expect(message).toContain('ប៉ះពាល់:');
    expect(message).toContain('36');  // Look for the number 36 which is NumPeoAff
  });

  it('should generate telegram message for incident disaster', () => {
    const message = generateTelegramMessage(INCIDENT, incidentMock as IncidentDto);
    console.warn('Incident Telegram Message: \n\n', message);
    
    expect(message).toContain('ថ្ងៃកើតហេតុ');
    expect(message).toContain('[ភ្ជាប់ទៅគេហទំព័រ]');
    
    // Check for affected people section
    expect(message).toContain('ប៉ះពាល់:');
    expect(message).toContain('36');  // Look for the number 36 which is NumPeoAff
  });
});
