import { date, datetime, etag, integer } from './common';

export type EventResource = {
  kind: 'calendar#event';
  etag: etag;
  id: string;
  status: string;
  htmlLink: string;
  created: datetime;
  updated: datetime;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: date;
    dateTime: datetime | Date;
    timeZone: string;
  };
  end: {
    date: date;
    dateTime: datetime | Date;
    timeZone: string;
  };
  endTimeUnspecified: boolean;
  recurrence: [string];
  recurringEventId: string;
  originalStartTime: {
    date: date;
    dateTime: datetime;
    timeZone: string;
  };
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: integer;
  attendees: [
    {
      id: string;
      email: string;
      displayName: string;
      organizer: boolean;
      self: boolean;
      resource: boolean;
      optional: boolean;
      responseStatus: string;
      comment: string;
      additionalGuests: integer;
    },
  ];
  attendeesOmitted: boolean;
  extendedProperties: {
    private: {
      [key: string]: string;
    };
    shared: {
      [key: string]: string;
    };
  };
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      },
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget: {
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width: integer;
    height: integer;
    display: string;
    preferences: {
      [key: string]: string;
    };
  };
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: integer;
      },
    ];
  };
  source: {
    url: string;
    title: string;
  };
  attachments: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    },
  ];
  eventType: string;
};

export type EventsList = {
  kind: 'calendar#events';
  etag: etag;
  summary: string;
  description: string;
  updated: datetime;
  timeZone: string;
  accessRole: string;
  defaultReminders: [
    {
      method: string;
      minutes: integer;
    },
  ];
  nextPageToken: string;
  nextSyncToken: string;
  items: EventResource[];
};

/**
 * Parser Functions
 */

export function parseEventResource(data: any): EventResource {
  return {
    ...data,
    start: {
      ...data?.start,
      dateTime: data?.start?.dateTime
        ? new Date(data.start.dateTime)
        : undefined,
    },
    end: {
      ...data?.end,
      dateTime: data?.end?.dateTime ? new Date(data.end.dateTime) : undefined,
    },
  };
}

export function parseEventsList(data: any): EventsList {
  return {
    ...data,
    items: (data?.items || []).map((data: any) => parseEventResource(data)),
  };
}

/**
 * Helper Functions
 */
export function displayEventTimeRange(eventResource: EventResource): string {
  const start: Date | string | null =
    eventResource.start?.dateTime ?? eventResource.start?.date;
  const end: Date | string | null =
    eventResource.end?.dateTime ?? eventResource.end?.date;

  let result = '';

  if (start && end) {
    if (start instanceof Date && end instanceof Date) {
      const startString = start.toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
      });

      const startDate = start.toLocaleDateString(undefined, {
        dateStyle: 'short',
      });
      const endDate = end.toLocaleDateString(undefined, {
        dateStyle: 'short',
      });
      if (startDate === endDate) {
        const startTime = start.toLocaleTimeString(undefined, {
          timeStyle: 'short',
        });
        const endTime = end.toLocaleTimeString(undefined, {
          timeStyle: 'short',
        });

        result = `${startString} - ${endTime}`;
      } else {
        const endString = end.toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        });

        result = `${startString} to ${endString}`;
      }
    } else {
      result = `${start} to ${end}`;
    }
  } else if (start) {
    result = start.toString();
  } else if (end) {
    result = end.toString();
  } else {
    result = 'Unkonwn';
  }

  return result;
}
