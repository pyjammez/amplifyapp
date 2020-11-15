function ucWords(string) {
    return string.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1, string.length);
}

function ucFriendly(string) {
    return string.replace(/-/g, '').toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

const StringHelper = {ucWords, ucFirst, ucFriendly};
export default StringHelper;
