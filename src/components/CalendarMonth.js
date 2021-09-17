import React from 'react';

export default function CalendarMonth({eventsMonthly, selectedMonth, selectedDay, nextMonth, previousMonth, currentYear, daysInMonth}) {
    
    const calendarMatrix = [];
    const weekDaysArr = [1,2,3,4,5,6,0];
    const weekDaysNames = ["Pn", "Wt", "Sr", "Cz", "Pt", "Sb", "Nd"]
    const monthArr = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
     
    let firstDayInMonth = new Date(currentYear, selectedMonth, 1).getDay();
    let calendarStart = weekDaysArr.indexOf(firstDayInMonth);

    const createMatrix = () =>{

        let countDays = 1;

        for(let i = 1; i < 7; i++){
            let dataCells = [];
            for(let j = 1; j < 8; j++){
                if(calendarStart > 0 || countDays > daysInMonth){
                    dataCells.push('');
                    calendarStart -- ; 
                } else {
                    dataCells.push(countDays);
                    countDays ++ ;
                }
            }
            calendarMatrix.push(dataCells);
            }
        }
        const forwardMonth = () => { selectedMonth === 11 ? nextMonth(0) : nextMonth(selectedMonth + 1)};
        const backMonth = () => { selectedMonth === 0 ? previousMonth(11) : previousMonth(selectedMonth - 1)};
    
    return (
        <div className="container">  
            {createMatrix()}  
            <div className="monthTitle">
                <button className="arrowButton" onClick={backMonth}>&lt;&lt;</button> 
                    {monthArr[selectedMonth]}
                        <button className="arrowButton" onClick={forwardMonth}>&gt;&gt;</button> 
            </div> 
            
            <table>
                <tbody>
                    <tr>{weekDaysNames.map(day => <td className="td-header" key={day}>{day}</td>)}</tr>
                </tbody>
            </table>
            
            <table>
                <tbody>
                    {calendarMatrix.map((rows, index)=> 
                        <tr key={index}> 
                            {rows.map((col, index) => (

                                eventsMonthly[selectedMonth]!== undefined && eventsMonthly[selectedMonth].hasOwnProperty(col) 
                                && eventsMonthly[selectedMonth][col].length > 0 
                                
                                ?

                                <td className="hasEvent" key={index} onClick={()=>selectedDay(col)}>
                                    <div className="hasEventDate">{col}</div>
                                    <div className="hasEventDat">{`Zad. ${eventsMonthly[selectedMonth][col].length}`}</div></td> 
                                
                                :
                                
                                <td key={index} onClick={()=> selectedDay(col)}>{col}</td>  
                             ))
                            }
                        </tr>)
                    }
                </tbody>
            </table>
            <div>
                
            </div>
        </div>
    )
}

