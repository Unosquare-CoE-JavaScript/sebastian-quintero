const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
    const [startHour, startMinute] = startTime.split(':');

    const meetingStartHour = startHour.padStart(2, '0');
    const meetingStartMinute = startMinute.padStart(2, '0');
    const meetingStartTime = `${meetingStartHour}:${meetingStartMinute}`;

    const meetingHours = Math.floor(durationMinutes / 60);
    const meetingMinutes = durationMinutes % 60;
    const meetingEndHour = (parseInt(startTime) + meetingHours).toString().padStart(2, '0');
    const meetingEndMinute = (parseInt(startMinute) + meetingMinutes).toString().padStart(2, '0');
    const meetingEndTime = `${meetingEndHour}:${meetingEndMinute}`;

    return dayStart <= meetingStartTime && meetingEndTime <= dayEnd;
}

function assertEqual(received, expected) {
    if (expected !== received) {
        throw new Error(`expected ${expected} to be ${received}`);
    }
}

assertEqual(scheduleMeeting("7:00", 15), false);
assertEqual(scheduleMeeting("07:15", 30), false);
assertEqual(scheduleMeeting("7:30", 30), true);
assertEqual(scheduleMeeting("11:30", 60), true);
assertEqual(scheduleMeeting("17:00", 45), true);
assertEqual(scheduleMeeting("17:30", 30), false);
assertEqual(scheduleMeeting("18:00", 15), false);
