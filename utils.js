export const formatTime = (input) => {
  const numberInput = parseFloat(input);

  if (!isNaN(numberInput)) {
    const hours = Math.floor(numberInput);
    const minutes = Math.round((numberInput - hours) * 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  } else {
    return "Invalid input. Please provide a valid number.";
  }
};
