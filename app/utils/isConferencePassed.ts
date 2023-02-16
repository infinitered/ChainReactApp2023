import isPast from "date-fns/isPast"

export const isConferencePassed = () => isPast(new Date("2023-05-19T23:59:59")) // After midnight on May 19th, 2023 conference is passed
