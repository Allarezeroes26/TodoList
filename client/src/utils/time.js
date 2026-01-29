// Convert milliseconds to "Hh Mm"
export const formatDuration = (ms) => {
  const mins = Math.floor(ms / 60000);
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m`;
};

// Total time from an array of sessions
export const totalTime = (sessions) =>
  sessions.reduce((total, s) => (!s.end ? total : total + (new Date(s.end) - new Date(s.start))), 0);

// Check if date is today
export const isToday = (date) =>
  new Date(date).toDateString() === new Date().toDateString();
