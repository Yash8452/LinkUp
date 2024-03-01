export const formatDuration = (date) => {
  const currentDate = new Date();
  const commentDate = new Date(date);
  const timeDiff = Math.abs(currentDate - commentDate);
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return commentDate.toLocaleString(); // Return formatted date if less than or equal to 24 hours
  } else {
    // If more than 24 hours, return only date portion
    const options = { year: "numeric", month: "long", day: "numeric" };
    return commentDate.toLocaleDateString(undefined, options);
  }
};
