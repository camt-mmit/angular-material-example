import { integer } from './common';

export type ObjectType = 'OBJECT_TYPE_UNSPECIFIED' | 'PERSON' | 'PAGE';

export type SourceType =
  | 'SOURCE_TYPE_UNSPECIFIED'
  | 'ACCOUNT'
  | 'PROFILE'
  | 'DOMAIN_PROFILE'
  | 'CONTACT'
  | 'OTHER_CONTACT'
  | 'DOMAIN_CONTACT';

export type UserType =
  | 'USER_TYPE_UNKNOWN'
  | 'GOOGLE_USER'
  | 'GPLUS_USER'
  | 'GOOGLE_APPS_USER';

export type AgeRange =
  | 'AGE_RANGE_UNSPECIFIED'
  | 'LESS_THAN_EIGHTEEN'
  | 'EIGHTEEN_TO_TWENTY'
  | 'TWENTY_ONE_OR_OLDER';

export type ContentType =
  | 'CONTENT_TYPE_UNSPECIFIED'
  | 'TEXT_PLAIN'
  | 'TEXT_HTML';

export type KeywordType =
  | 'TYPE_UNSPECIFIED'
  | 'OUTLOOK_BILLING_INFORMATION'
  | 'OUTLOOK_DIRECTORY_SERVER'
  | 'OUTLOOK_KEYWORD'
  | 'OUTLOOK_MILEAGE'
  | 'OUTLOOK_PRIORITY'
  | 'OUTLOOK_SENSITIVITY'
  | 'OUTLOOK_SUBJECT'
  | 'OUTLOOK_USER'
  | 'HOME'
  | 'WORK'
  | 'OTHER';

export type NicknameType = 'DEFAULT' | 'ALTERNATE_NAME';

export type ReadSourceType =
  | 'READ_SOURCE_TYPE_UNSPECIFIED'
  | 'READ_SOURCE_TYPE_PROFILE'
  | 'READ_SOURCE_TYPE_CONTACT'
  | 'READ_SOURCE_TYPE_DOMAIN_CONTACT';

export type SortOrder =
  | 'LAST_MODIFIED_ASCENDING'
  | 'LAST_MODIFIED_DESCENDING'
  | 'FIRST_NAME_ASCENDING'
  | 'LAST_NAME_ASCENDING';

export type Date = {
  year: integer;
  month: integer;
  day: integer;
};

export type ProfileMetadata = {
  objectType: ObjectType;
  userTypes: UserType[];
};

export type Source = {
  type: SourceType;
  id: string;
  etag: string;
  updateTime: string;
  profileMetadata: ProfileMetadata;
};

export type FieldMetadata = {
  primary: boolean;
  sourcePrimary: boolean;
  verified: boolean;
  source: Source;
};

export type PersonMetadata = {
  sources: Source[];
  previousResourceNames: string[];
  linkedPeopleResourceNames: string[];
  deleted: boolean;
};

export type HasMetadata = {
  metadata: FieldMetadata;
};

export type Address = HasMetadata & {
  formattedValue: string;
  type: string;
  formattedType: string;
  poBox: string;
  streetAddress: string;
  extendedAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
};

export type AgeRangeType = HasMetadata & {
  ageRange: AgeRange;
};

export type Biography = HasMetadata & {
  value: string;
  contentType: ContentType;
};

export type Birthday = HasMetadata & {
  date: Date;
  text: string;
};

export type CalendarUrl = HasMetadata & {
  url: string;
  type: string;
  formattedType: string;
};

export type ClientData = HasMetadata & {
  key: string;
  value: string;
};

export type CoverPhoto = HasMetadata & {
  url: string;
  default: boolean;
};

export type EmailAddress = HasMetadata & {
  value: string;
  type: string;
  formattedType: string;
  displayName: string;
};

export type Event = HasMetadata & {
  date: Date;
  type: string;
  formattedType: string;
};

export type ExternalId = HasMetadata & {
  value: string;
  type: string;
  formattedType: string;
};

export type FileAs = HasMetadata & {
  value: string;
};

export type Gender = HasMetadata & {
  value: string;
  formattedValue: string;
  addressMeAs: string;
};

export type ImClient = HasMetadata & {
  username: string;
  type: string;
  formattedType: string;
  protocol: string;
  formattedProtocol: string;
};

export type Interest = HasMetadata & {
  value: string;
};

export type Locale = HasMetadata & {
  value: string;
};

export type Location = HasMetadata & {
  value: string;
  type: string;
  current: boolean;
  buildingId: string;
  floor: string;
  floorSection: string;
  deskCode: string;
};

export type ContactGroupMembership = {
  contactGroupResourceName: string;
};

export type DomainMembership = {
  inViewerDomain: boolean;
};

export type Membership = HasMetadata & {
  // Union field membership can be only one of the following:
  contactGroupMembership?: ContactGroupMembership;
  domainMembership?: DomainMembership;
  // End of list of possible types for union field membership.
};

export type MiscKeyword = HasMetadata & {
  value: string;
  type: KeywordType;
  formattedType: string;
};

export type Name = HasMetadata & {
  displayName: string;
  displayNameLastFirst: string;
  unstructuredName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  honorificPrefix: string;
  honorificSuffix: string;
  phoneticFullName: string;
  phoneticFamilyName: string;
  phoneticGivenName: string;
  phoneticMiddleName: string;
  phoneticHonorificPrefix: string;
  phoneticHonorificSuffix: string;
};

export type Nickname = HasMetadata & {
  value: string;
  type: NicknameType;
};

export type Occupation = HasMetadata & {
  value: string;
};

export type Organization = HasMetadata & {
  type: string;
  formattedType: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  name: string;
  phoneticName: string;
  department: string;
  title: string;
  jobDescription: string;
  symbol: string;
  domain: string;
  location: string;
  costCenter: string;
  fullTimeEquivalentMillipercent: integer;
};

export type PhoneNumber = HasMetadata & {
  value: string;
  canonicalForm: string;
  type: string;
  formattedType: string;
};

export type Photo = HasMetadata & {
  url: string;
  default: boolean;
};

export type Relation = HasMetadata & {
  person: string;
  type: string;
  formattedType: string;
};

export type SipAddress = HasMetadata & {
  value: string;
  type: string;
  formattedType: string;
};

export type Skill = HasMetadata & {
  value: string;
};

export type Url = HasMetadata & {
  value: string;
  type: string;
  formattedType: string;
};

export type UserDefined = HasMetadata & {
  key: string;
  value: string;
};

export type Person = {
  resourceName: string;
  etag: string;
  metadata: PersonMetadata;
  addresses: Address[];
  ageRanges: AgeRangeType[];
  biographies: Biography[];
  birthdays: Birthday[];
  calendarUrls: CalendarUrl[];
  clientData: ClientData[];
  coverPhotos: CoverPhoto[];
  emailAddresses: EmailAddress[];
  events: Event[];
  externalIds: ExternalId[];
  fileAses: FileAs[];
  genders: Gender[];
  imClients: ImClient[];
  interests: Interest[];
  locales: Locale[];
  locations: Location[];
  memberships: Membership[];
  miscKeywords: MiscKeyword[];
  names: Name[];
  nicknames: Nickname[];
  occupations: Occupation[];
  organizations: Organization[];
  phoneNumbers: PhoneNumber[];
  photos: Photo[];
  relations: Relation[];
  sipAddresses: SipAddress[];
  skills: Skill[];
  urls: Url[];
  userDefined: UserDefined[];
};

export type ConnectionsList = {
  connections: Person[];
  nextPageToken: string;
  nextSyncToken: string;
  totalItems: integer;
};

export type ConnectionsListParams = {
  personFields: string;
  pageToken?: string;
  pageSize?: integer;
  sortOrder?: SortOrder;
  requestSyncToken?: boolean;
  syncToken?: string;
  sources?: SourceType[];
};

export type CreateContactParams = {
  personFields: string;
  sources?: SourceType[];
};

/**
 * Parser Functions
 */

export function parseDate(data: any): Date {
  return { ...data };
}

export function parseProfileMetadata(data: any): ProfileMetadata {
  return { ...data };
}

export function parseSource(data: any): Source {
  return {
    ...data,
    profileMetadata: parseProfileMetadata(data?.profileMetadata),
  };
}

export function parseFieldMetadata(data: any): FieldMetadata {
  return {
    ...data,
    source: parseSource(data?.source),
  };
}

export function parsePersonMetadata(data: any): PersonMetadata {
  return {
    ...data,
    sources: (data?.sources || []).map((data: any) => parseSource(data)),
  };
}

export function parseHasMetadata<T extends HasMetadata>(data: any): T {
  return {
    ...data,
    metadata: parseFieldMetadata(data?.metadata),
  };
}

export function parseAddress(data: any): Address {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseAgeRangeType(data: any): AgeRangeType {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseBiography(data: any): Biography {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseBirthday(data: any): Birthday {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseCalendarUrl(data: any): CalendarUrl {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseClientData(data: any): ClientData {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseCoverPhoto(data: any): CoverPhoto {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseEmailAddress(data: any): EmailAddress {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseEvent(data: any): Event {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseExternalId(data: any): ExternalId {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseFileAs(data: any): FileAs {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseGender(data: any): Gender {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseImClient(data: any): ImClient {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseInterest(data: any): Interest {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseLocale(data: any): Locale {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseLocation(data: any): Location {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseContactGroupMembership(data: any): ContactGroupMembership {
  return { ...data };
}

export function parseDomainMembership(data: any): DomainMembership {
  return { ...data };
}

export function parseMembership(data: any): Membership {
  const membership = {
    ...parseHasMetadata<Membership>(data),
  };

  if (membership?.contactGroupMembership) {
    membership.contactGroupMembership = parseContactGroupMembership(
      membership.contactGroupMembership,
    );
  }

  if (membership?.domainMembership) {
    membership.domainMembership = parseDomainMembership(
      membership.domainMembership,
    );
  }

  return membership;
}

export function parseMiscKeyword(data: any): MiscKeyword {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseName(data: any): Name {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseNickname(data: any): Nickname {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseOccupation(data: any): Occupation {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseOrganization(data: any): Organization {
  return {
    ...parseHasMetadata(data),
    startDate: parseDate(data?.startDate),
    endDate: parseDate(data?.endDate),
  };
}

export function parsePhoneNumber(data: any): PhoneNumber {
  return {
    ...parseHasMetadata(data),
  };
}

export function parsePhoto(data: any): Photo {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseRelation(data: any): Relation {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseSipAddress(data: any): SipAddress {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseSkill(data: any): Skill {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseUrl(data: any): Url {
  return {
    ...parseHasMetadata(data),
  };
}

export function parseUserDefined(data: any): UserDefined {
  return {
    ...parseHasMetadata(data),
  };
}

export function parsePerson(data: any): Person {
  return {
    ...data,
    metadata: parsePersonMetadata(data?.metadata),
    addresses: (data?.address || []).map((data: any) => parseAddress(data)),
    ageRanges: (data?.ageRanges || []).map((data: any) =>
      parseAgeRangeType(data),
    ),
    biographies: (data?.biographies || []).map((data: any) =>
      parseBiography(data),
    ),
    birthdays: (data?.birthdays || []).map((data: any) => parseBirthday(data)),
    calendarUrls: (data?.calendarUrls || []).map((data: any) =>
      parseCalendarUrl(data),
    ),
    clientData: (data?.clientData || []).map((data: any) =>
      parseClientData(data),
    ),
    coverPhotos: (data?.coverPhotos || []).map((data: any) =>
      parseCoverPhoto(data),
    ),
    emailAddresses: (data?.emailAddresses || []).map((data: any) =>
      parseEmailAddress(data),
    ),
    events: (data?.events || []).map((data: any) => parseEvent(data)),
    externalIds: (data?.externalIds || []).map((data: any) =>
      parseExternalId(data),
    ),
    fileAses: (data?.fileAses || []).map((data: any) => parseFileAs(data)),
    genders: (data?.genders || []).map((data: any) => parseGender(data)),
    imClients: (data?.imClients || []).map((data: any) => parseImClient(data)),
    interests: (data?.interests || []).map((data: any) => parseInterest(data)),
    locales: (data?.locales || []).map((data: any) => parseLocale(data)),
    locations: (data?.locations || []).map((data: any) => parseLocation(data)),
    memberships: (data?.memberships || []).map((data: any) =>
      parseMembership(data),
    ),
    miscKeywords: (data?.miscKeywords || []).map((data: any) =>
      parseMiscKeyword(data),
    ),
    names: (data?.names || []).map((data: any) => parseName(data)),
    nicknames: (data?.nicknames || []).map((data: any) => parseNickname(data)),
    occupations: (data?.occupations || []).map((data: any) =>
      parseOccupation(data),
    ),
    organizations: (data?.organizations || []).map((data: any) =>
      parseOrganization(data),
    ),
    phoneNumbers: (data?.phoneNumbers || []).map((data: any) =>
      parsePhoneNumber(data),
    ),
    photos: (data?.photos || []).map((data: any) => parsePhoto(data)),
    relations: (data?.relations || []).map((data: any) => parseRelation(data)),
    sipAddresses: (data?.sipAddresses || []).map((data: any) =>
      parseSipAddress(data),
    ),
    skills: (data?.skills || []).map((data: any) => parseSkill(data)),
    urls: (data?.urls || []).map((data: any) => parseUrl(data)),
    userDefined: (data?.userDefined || []).map((data: any) =>
      parseUserDefined(data),
    ),
  };
}

export function parseConnectionsList(data: any): ConnectionsList {
  return {
    ...data,
    connections: (data?.connections || []).map((data: any) =>
      parsePerson(data),
    ),
  };
}

/**
 * Helper Functions
 */
export function getPrimaryMetadata<T extends HasMetadata>(
  items: T[],
): T | undefined {
  return items.find((item) => item.metadata.primary);
}

export function displayName(names: Name[]): string | undefined {
  return getPrimaryMetadata(names)?.displayName;
}

export function displayEmailAddress(
  emailAddresses: EmailAddress[],
): string | undefined {
  return getPrimaryMetadata(emailAddresses)?.value;
}

export function displayPhoneNumber(
  phoneNumbers: PhoneNumber[],
): string | undefined {
  return getPrimaryMetadata(phoneNumbers)?.value;
}

export function urlPhotos(photos: Photo[]): string | undefined {
  return getPrimaryMetadata(photos)?.url;
}
