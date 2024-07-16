export function millsToMinutesAndSeconds(mills) {
    const minutes = Math.floor(mills / 60000);
    const seconds = ((mills % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}