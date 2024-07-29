export const formatMinute = (time: number) => {
    const minutes = time;
    const hours = minutes > 60 ? `${Math.floor(minutes/60)}h${minutes%60}m` : `${minutes}m`
    return hours;
}