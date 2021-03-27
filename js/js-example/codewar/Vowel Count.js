function getCount(str) {
    var vowelsCount = 0;
    for (let i = 0; i < str.length; i++) {
        switch (str.charAt(i)) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                vowelsCount++;
                break;
        }
    }
    return vowelsCount;
}