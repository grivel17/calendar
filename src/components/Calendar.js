import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import CalendarMonth from './CalendarMonth';
import CalendarDay from './CalendarDay';
import AddEvent from './AddEvent';


export default function Calendar() {

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear().toString();
    const initialYearArr = [{}, {}, {},  {}, {}, {}, {}, {}, {}, {}, {}, {}];
    
    const [eventsMonthly, setEventsMonthly] = useState(()=>{
        const savedEvents = localStorage.getItem(currentYear);
        if(currentYear){
            return JSON.parse(savedEvents)
        } else {
            return initialYearArr; 
        }
    });

    const [selectedDay, setSelectedDay] = useState(currentDay); 

    const [selectedMonth, setSelectedMonth ] = useState(currentMonth);

    const [editMode, setEditMode] = useState(false);

    const [eventWindow, setEventWindow] = useState(false);

    const daysInMonth = new Date(2021, selectedMonth +1, 0).getDate();
    const daysInPreviousMonth = new Date(2021, selectedMonth, 0).getDate();
   
    useEffect(() => {
        localStorage.setItem(currentYear, JSON.stringify(eventsMonthly))
    }, [eventsMonthly])


    return (
        
        <div className="calendarContainer">
            <div className="appTitle">
                REACT KALENDARZ NA BIEŻĄCY ROK
            </div>
           
            <Weather />
            <CalendarDay 
                selectedDay={selectedDay}
                selectedMonth={selectedMonth}
                daysInMonth={daysInMonth}
                daysInPreviousMonth={daysInPreviousMonth}
                eventsMonthly={eventsMonthly}
                nextDay={setSelectedDay}
                previousDay={setSelectedDay}
                nextMonth={setSelectedMonth}
                previousMonth={setSelectedMonth}
                transferState={setEventsMonthly}
                setEditMode={setEditMode} 
                editMode={editMode}
            />

            {eventWindow ? 
              <AddEvent 
                  eventsMonthly={eventsMonthly}
                  selectedDay={selectedDay}
                  selectedMonth={selectedMonth}
                  currentMonth={currentMonth}
                  transferState={setEventsMonthly} 
                  closeEventWindow={setEventWindow}
                    
                  /> : <button className={editMode ? 'editModeHide' : 'eventButtonAdd'} onClick={()=>setEventWindow(true)}>DODAJ WYDARZENIE</button>
            }

            <CalendarMonth 
                eventsMonthly={eventsMonthly}
                selectedMonth={selectedMonth}
                daysInMonth={daysInMonth}
                currentYear={currentYear}
                selectedDay={setSelectedDay}
                nextMonth={setSelectedMonth}
                previousMonth={setSelectedMonth}
            />
           <a href="https://github.com/grivel17/calendar" target="_blank">Odwiedź moje konto na GitHub. Zobacza pliki dla tej aplikacji</a>
        </div>
    )
}
