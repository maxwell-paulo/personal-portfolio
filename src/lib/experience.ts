type ExperiencePeriodEntry = {
    period: string;
};

const CURRENT_PERIOD_TOKENS = new Set(['present', 'presente', 'current', 'atual']);

const MONTHS_BY_TOKEN: Record<string, number> = {
    jan: 0,
    janeiro: 0,
    january: 0,
    feb: 1,
    fev: 1,
    fevereiro: 1,
    february: 1,
    mar: 2,
    marco: 2,
    march: 2,
    apr: 3,
    abr: 3,
    abril: 3,
    april: 3,
    may: 4,
    maio: 4,
    jun: 5,
    junho: 5,
    june: 5,
    jul: 6,
    julho: 6,
    july: 6,
    aug: 7,
    ago: 7,
    agosto: 7,
    august: 7,
    sep: 8,
    set: 8,
    setembro: 8,
    september: 8,
    oct: 9,
    out: 9,
    outubro: 9,
    october: 9,
    nov: 10,
    novembro: 10,
    november: 10,
    dec: 11,
    dez: 11,
    dezembro: 11,
    december: 11,
};

function normalizePeriodToken(value: string) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\./g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function getPeriodTimestamp(periodPart: string, boundary: 'start' | 'end') {
    const normalizedPeriodPart = normalizePeriodToken(periodPart);

    if (CURRENT_PERIOD_TOKENS.has(normalizedPeriodPart)) {
        return Number.POSITIVE_INFINITY;
    }

    const monthAndYearMatch = normalizedPeriodPart.match(/^([a-z]+)\s+(\d{4})$/);

    if (monthAndYearMatch) {
        const [, monthToken, yearToken] = monthAndYearMatch;
        const monthIndex = MONTHS_BY_TOKEN[monthToken];

        if (monthIndex !== undefined) {
            const year = Number(yearToken);

            return boundary === 'start'
                ? new Date(year, monthIndex, 1).getTime()
                : new Date(year, monthIndex + 1, 0).getTime();
        }
    }

    const yearMatch = normalizedPeriodPart.match(/^(\d{4})$/);

    if (yearMatch) {
        const year = Number(yearMatch[1]);

        return boundary === 'start'
            ? new Date(year, 0, 1).getTime()
            : new Date(year, 11, 31).getTime();
    }

    return Number.NEGATIVE_INFINITY;
}

function getExperienceSortValues(period: string) {
    const [startPart = '', endPart = ''] = period.split(/\s*-\s*/);
    const startDate = getPeriodTimestamp(startPart, 'start');
    const endDate = endPart ? getPeriodTimestamp(endPart, 'end') : getPeriodTimestamp(startPart, 'end');

    return { startDate, endDate };
}

export function sortExperienceKeysByPeriod(experiences: Record<string, ExperiencePeriodEntry>) {
    return Object.entries(experiences)
        .map(([key, experience], index) => ({
            key,
            index,
            ...getExperienceSortValues(experience.period),
        }))
        .sort((a, b) => {
            if (a.endDate !== b.endDate) {
                return b.endDate - a.endDate;
            }

            if (a.startDate !== b.startDate) {
                return b.startDate - a.startDate;
            }

            return a.index - b.index;
        })
        .map(({ key }) => key);
}
