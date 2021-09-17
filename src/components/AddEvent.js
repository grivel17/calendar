import React, {useState} from 'react';


export default function AddEvent({transferState, eventsMonthly, selectedDay, selectedMonth, closeEventWindow}) {

    const initialEvent = 'Bez nazwy'
    const initialTime = "00 : 00"

    
    const [newEvent, setNewEvent] = useState(initialEvent);
    
    const [startTime, setStartTime] = useState(initialTime); 
    const [endTime, setEndTime] = useState(initialTime);
    
   
    let eventsList = []
    eventsList = [...eventsMonthly] 
 
    const setEventsList = (event) => {
        event.preventDefault();
        const checkHasDayEvents = eventsList[selectedMonth].hasOwnProperty(selectedDay); 
         
        if(checkHasDayEvents){ 
          eventsList[selectedMonth][selectedDay].push({
              title: newEvent, 
              startTime: startTime, 
              endTime: endTime, 
              id: eventsList[selectedMonth][selectedDay].length +1})
          transferState(eventsList)
        } else {
        
        eventsList[selectedMonth][selectedDay] = [{
            title: newEvent, 
            startTime: startTime, 
            endTime: endTime, 
            id: 1}]
          transferState(eventsList) 
      }
     
      setNewEvent(initialEvent);
      setStartTime(initialTime);
      setEndTime(initialTime);
      closeEventWindow(false);
    }

    const inputEventHandler = (e) => {
        setNewEvent(e.target.value)
    }
    

    return (
        <div className="container">
                <div className="calendarDayContainer">
                    <div>   
                        <input 
                                className="inputText" 
                                value={newEvent} 
                                placeholder="Nowe wydarzenie" 
                                onChange={inputEventHandler}
                            ></input>   
                    </div>
                    <div>
                            <input 
                                className="inputTime" 
                                type="time"  
                                onChange={(e)=>setStartTime(e.target.value)}
                            ></input> 
                            <input 
                                className="inputTime" 
                                type="time" 
                                onChange={(e)=>setEndTime(e.target.value)}       
                            ></input>
                    </div>
               
                </div>
                <button className="eventButton" onClick={setEventsList}>ZAPISZ</button>  
        </div>
    )
}

