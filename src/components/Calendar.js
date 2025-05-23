import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Grid,
    styled
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO
} from 'date-fns';
import eventsData from '../data/events.json';

const CalendarContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 800,
    margin: '0 auto',
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const DayCell = styled(Box)(({ theme, isCurrentMonth, isToday, hasEvents }) => ({
    padding: theme.spacing(1),
    height: 100,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: isCurrentMonth ? 'white' : theme.palette.grey[100],
    position: 'relative',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    ...(isToday && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
    }),
}));

const EventDot = styled(Box)(({ color }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: 4,
    display: 'inline-block',
}));

const EventItem = styled(Box)(({ theme, color }) => ({
    fontSize: '0.75rem',
    padding: '2px 4px',
    marginBottom: 2,
    backgroundColor: color,
    color: 'white',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(eventsData.events);
    }, []);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    const getEventsForDay = (date) => {
        return events.filter(event =>
            isSameDay(parseISO(event.date), date)
        );
    };

    const renderCalendarGrid = () => {
        const firstDayOfMonth = startOfMonth(currentDate);
        const startingDayIndex = firstDayOfMonth.getDay();
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayIndex; i++) {
            days.push(
                <Grid item xs={12 / 7} key={`empty-${i}`}>
                    <DayCell />
                </Grid>
            );
        }

        // Add cells for each day of the month
        daysInMonth.forEach(day => {
            const dayEvents = getEventsForDay(day);
            days.push(
                <Grid item xs={12 / 7} key={day.toISOString()}>
                    <DayCell
                        isCurrentMonth={isSameMonth(day, currentDate)}
                        isToday={isToday(day)}
                    >
                        <Typography variant="subtitle2">
                            {format(day, 'd')}
                        </Typography>
                        {dayEvents.map(event => (
                            <EventItem key={event.id} color={event.color}>
                                {event.title} ({event.startTime})
                            </EventItem>
                        ))}
                    </DayCell>
                </Grid>
            );
        });

        return days;
    };

    return (
        <CalendarContainer elevation={3}>
            <CalendarHeader>
                <IconButton onClick={handlePrevMonth}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h5">
                    {format(currentDate, 'MMMM yyyy')}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                    <ChevronRightIcon />
                </IconButton>
            </CalendarHeader>
            <Grid container spacing={0}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Grid item xs={12 / 7} key={day}>
                        <Typography align="center" variant="subtitle2" sx={{ py: 1 }}>
                            {day}
                        </Typography>
                    </Grid>
                ))}
                {renderCalendarGrid()}
            </Grid>
        </CalendarContainer>
    );
};

export default Calendar; 