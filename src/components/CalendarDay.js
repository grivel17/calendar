import React, {useState} from 'react';
import { FaEdit, FaRegTimesCircle} from "react-icons/fa";



export default function CalendarDay({selectedDay, 
                                     eventsMonthly, 
                                     nextDay, 
                                     previousDay, 
                                     selectedMonth,
                                     nextMonth,
                                     previousMonth, 
                                     daysInMonth,
                                     daysInPreviousMonth,
                                     transferState,
                                     setEditMode,
                                     editMode
                                    }) {
    
    
    const monthArrNames = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"];

    let eventsForToday = eventsMonthly[selectedMonth][selectedDay] 
    let eventsList = []
    eventsList = [...eventsMonthly]                                    
    
    const [editEventId, setEditEventId] = useState();
    const [editEventTitle, setEditEventTitle] = useState();
    const [editEventStartTime, setEditEventStartTime] = useState();
    const [editEventEndTime, setEditEventEndTime] = useState();

    const nextDayHandler = () => {   
        nextDay(selectedDay < daysInMonth ?  selectedDay +1 : () => {nextDay(selectedDay = 1); 
            selectedMonth === 11 ? nextMonth(0) : nextMonth(selectedMonth +1);}); 
    }

    const previousDayHandler = () => {
        previousDay( selectedDay > 1 ? selectedDay -1 : () => { selectedMonth === 0 ? previousMonth(11) : 
            previousMonth(selectedMonth - 1); 
            previousDay(selectedDay = daysInPreviousMonth);
            
            })
    }

    const eventDelete = (id) =>{
        const afterRemove = eventsMonthly[selectedMonth][selectedDay].filter((i)=>{return i.id !== id});
        eventsMonthly[selectedMonth][selectedDay]  = afterRemove;
        transferState(eventsList) 
    }

    const eventEdit = (id, title, startTime, endTime) => {
        setEditMode(true);
        setEditEventTitle(title);
        setEditEventStartTime(startTime);
        setEditEventEndTime(endTime);
        setEditEventId(id);
    }

    const submitEditedEvent = (id) => {
        const editEvent = eventsList[selectedMonth][selectedDay].filter((i)=>{return i.id === id});
        editEvent[0].title = editEventTitle;
        editEvent[0].startTime = editEventStartTime;
        editEvent[0].endTime = editEventEndTime;
        transferState(eventsList);
        setEditMode(false);
    }

    return (

        <div>    
            <div className="calendarDayContainer">  
            
                    <div className="dayTitle">
                        <button className="arrowButton" onClick={previousDayHandler}>&lt;&lt;</button>  
                            {`${selectedDay} ${monthArrNames[selectedMonth]}`}
                        <button className="arrowButton" onClick={nextDayHandler}>&gt;&gt;</button>   
                    </div>

                        
                    <div className="eventsContainer">

                        {eventsForToday !== undefined ? 
                           
                            eventsForToday.sort((item1, item2) => item1.startTime > item2.startTime ? 1 : -1).map((e) => 
                            
                            <div className={editMode ? "eventItemEdit" : "eventItem"} key={e.id}>
                        
                                <div className="eventTime">{`Od ${e.startTime} do ${e.endTime}`}</div> 
                                    <div onClick={()=> eventDelete(e.id)} className="eventDelete"><FaRegTimesCircle /></div>
                                
                                <div className={editMode ? "eventTitleEdit" : "eventTitle"}>{e.title}
                                    <div onClick={()=> eventEdit(e.id, e.title, e.startTime, e.endTime)} className="eventEdit"><FaEdit /></div>
                                </div> 
                                
                        
                            </div>) : ""
                    }     
                    </div>
            </div>
                
          <div className={editMode ? 'calendarDayContainer' : 'editModeHide'}>
                    <div>   
                        <input 
                                className="inputText" 
                                value={editEventTitle} 
                                placeholder="Nowe wydarzenie" 
                                onChange={(e)=> setEditEventTitle(e.target.value)}
                            ></input>   
                    </div>
                    <div>
                            <input 
                                className="inputTime" 
                                type="time"  
                                value={editEventStartTime}
                                onChange={(e)=>setEditEventStartTime(e.target.value)}
                            ></input> 
                            <input 
                                className="inputTime" 
                                type="time" 
                                value={editEventEndTime}
                                onChange={(e)=>setEditEventEndTime(e.target.value)}       
                            ></input>
                    </div>
                    <button className="eventButton" onClick={()=>submitEditedEvent(editEventId)} >ZAPISZ</button>  
                </div>
    </div>
    )
}


