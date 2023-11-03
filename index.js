var inputDay = $('#day').val();
var inputMonth = $('#month').val();
var inputYear = $('#year').val();
var yearFormat=`${inputYear}/${inputMonth}/${inputDay}`;
var yearObj = new Date(yearFormat);
const form = $('form');
let today = new Date();
const yearToday = today.getFullYear();
var counter = 0;
var myList = [];
function dayValid() {
    return inputDay < 32;
}
function monthValid() {
    return inputMonth < 13;
}
function yearValid() {
    return inputYear <= yearToday;
}
form.on('change', (e) => {
    e.preventDefault();
    inputDay = $('#day').val();
    counter ++;
    inputMonth = $('#month').val(); 
    inputYear = $('#year').val();
    yearFormat=`${inputYear}/${inputMonth}/${inputDay}`;
    yearObj = new Date(yearFormat);
    while(myList.length >0) {
        const item = myList.pop();
        if (item == "input") {
            $("input").removeClass("error-state");
            $(".valid-all").addClass("hide");
            $(".input-container span").removeClass("color-red");
        }
        else {
            $(item).addClass("hide");
        }
    }
});

form.on('submit', (e) => {
    e.preventDefault();
    if (inputDay === '') {
        $(".required-day").removeClass("hide")
        myList.push(".required-day");
    }
    else if (inputMonth === '') {
        $(".required-month").removeClass("hide");
        myList.push(".required-month");
    }
    else if (inputYear === '') {
        $(".required-year").removeClass("hide");
        myList.push(".required-year");
    }
    else{
        if(!dayValid()){
            $(".validity-day").removeClass("hide");
            myList.push(".validity-day");
        }
        else if(!monthValid()) {
            $(".validity-month").removeClass("hide"); 
            myList.push(".validity-month");
        }
        else if(!yearValid()) {
            $(".validity-year").removeClass("hide");
            myList.push(".validity-year");
        }
        else {
            if (isNaN(yearObj) || yearObj.getDate() != inputDay){
                $("input").addClass("error-state");
                myList.push("input");
                $(".valid-all").removeClass("hide");
                $(".input-container span").addClass("color-red");

            }
            else {
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDay = today.getDate();
                var yearAge = todayYear - inputYear;

                if (todayMonth >= inputMonth)  
                //get months when current month is greater  
                    var monthAge = todayMonth - inputMonth;  
                else {  
                    yearAge--;  
                    var monthAge = 12 + todayMonth - inputMonth;  
                }
                if (todayDay >= inputDay){
                    var dateAge = todayDay - inputDay;  
                }  
                //get days when the current date is greater  
                    
                else {  
                    monthAge--;  
                    var dateAge = 31 + todayDay - inputDay;  
                
                    if (monthAge < 0) {  
                    monthAge = 11;  
                    yearAge--;  
                    }  
                }
                $(".this-years").text(yearAge);
                $(".this-months").text(monthAge);
                $(".this-days").text(dateAge);
                
            }
            
        }
    }
    
});