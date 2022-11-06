const minMS = 60 * 1000;
const hourMS = 60 * 60 * 1000;
const dayMS = 24 * hourMS;

export const dateToHumanReadibleFormat = (date: string) : string => {
    let commentDate = new Date(date);
    let current_date = new Date();
    let diff = current_date.getTime() - commentDate.getTime();
    if (diff > dayMS) {
        return new Intl.DateTimeFormat().format(new Date(date));
    }
    let hours = Math.floor(diff / hourMS);
    if (hours > 1) {
        return new Intl.RelativeTimeFormat("en").format(-hours, "hour");
    }
    let minutes = Math.max(Math.floor(diff / minMS), 1);
    return new Intl.RelativeTimeFormat("en").format(-minutes, "minute")
}