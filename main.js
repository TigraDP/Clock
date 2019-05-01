class ClockCalendar extends HTMLElement{
    constructor(){
        super();  
        this.isEuDate = true;
        this.isShortFormat = true;
        this.isTime = true;
        this.addEventListener("click", e => {
            if(this.isTime){
            this.isShortFormat = !this.isShortFormat;
            this.showTime();
            } else{
                this.isEuDate = !this.isEuDate;
                this.showDate();
            };        
        });
        this.addEventListener("contextmenu", e => {
            e.preventDefault();
            if(this.isTime){            
            this.isTime = !this.isTime;
            this.showDate();
            } else{
                this.isTime = !this.isTime;
                this.showTime();
            };
        });
    };
    connectedCallback(){ 
        const template = document.querySelector('template');       
        const shadowRoot = this.attachShadow ({mode: 'open'});        
        const content = document.importNode (template.content, true);
        shadowRoot.appendChild(content);   
        this.clockCalendar = shadowRoot.querySelector('.clock-calendar');
        clearInterval(this.timer);            
        this.timer = this.getTime();
    };

    getTime(){                   
        let elem = this.clockCalendar;
        let swith = this.isShortFormat;
        let date = new Date();
        let hours = date.getHours();
        if(hours < 10) hours = '0' + hours;
        let minutes = date.getMinutes();
        if(minutes < 10) minutes = '0' + minutes; 
        let seconds = date.getSeconds();
        if(seconds < 10) seconds = '0'+ seconds;
        let currentTime = `${hours}:${minutes}:${seconds}`;
        if(swith) currentTime = `${hours}:${minutes}`;
        elem.innerHTML = currentTime;               
        let timer = setInterval(function (){
        let date = new Date();
        let hours = date.getHours();
        if(hours < 10) hours = '0' + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes; 
        let seconds = date.getSeconds();
        if(seconds < 10) seconds = '0'+ seconds;
        let currentTime = `${hours}:${minutes}:${seconds}`;
        if(swith) currentTime = `${hours}:${minutes}`;
        elem.innerHTML = currentTime;           
        },1000);        
        return timer;
    };

    getDate(){                   
        let elem = this.clockCalendar;
        let swith = this.isEuDate;
        let date = new Date();
        let day = date.getDate();
        if(day < 10) day = '0' + day;
        let month = date.getMonth()+1;
        if (month < 10) month = '0' + month; 
        let year = date.getFullYear();        
        let currentDate = `${day}.${month}.${year}`;
        if(swith){
            year = date.getFullYear() % 100;
            currentDate = `${month}/${day}/${year}`;
        };
        elem.innerHTML = currentDate;               
        let timer = setInterval(function (){
        let date = new Date();
        let day = date.getDate();
        if(day < 10) hours = '0' + day;
        let month = date.getMonth()+1;
        if (month < 10) minutes = '0' + month; 
        let year = date.getFullYear();        
        let currentDate = `${day}.${month}.${year}`;
        if(swith){
            year = date.getFullYear() % 100;
            currentDate = `${month}/${day}/${year}`;
        };
        elem.innerHTML = currentDate;         
        },60000);        
        return timer;
    };

    showTime(){        
        clearInterval(this.timer);            
        this.timer = this.getTime();           
    };

    showDate(){        
        clearInterval(this.timer);            
        this.timer = this.getDate();
    };            
};
customElements.define("clock-calendar", ClockCalendar);











