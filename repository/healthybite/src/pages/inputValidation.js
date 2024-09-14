export const handleInputChange = (value, min, max, setter) => {
    // Allow clearing the input
    if (value === "") {
        setter("");
        return;
    }

    // Parse the input and ensure it's a valid number within the range
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
        setter(parsedValue);
    }
};
