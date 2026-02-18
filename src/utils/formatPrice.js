export const formatPrice = (price) => {
    if (price === undefined || price === null) return "٠";

    const formattedNumber = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(price);

    return `${formattedNumber} درهم`;
};
