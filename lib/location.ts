import { profile } from '@/data/profile';

/** Postal abbreviations for regions that appear in profile.location. */
const REGION_CODES: Record<string, string> = {
  Alberta: 'AB',
};

/** City and region code parsed from profile.location ("Calgary, Alberta, Canada"). */
function parseLocation(location: string): { locality: string; region: string } {
  const [locality = '', regionName = ''] = location.split(',').map((part) => part.trim());
  return { locality, region: REGION_CODES[regionName] ?? regionName };
}

export const profileLocation = parseLocation(profile.location);

/** e.g. "Calgary, AB" */
export const profileLocationShort = [profileLocation.locality, profileLocation.region]
  .filter(Boolean)
  .join(', ');
