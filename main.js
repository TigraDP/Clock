class ClockCalendar extends HTMLElement{
    constructor(){
        super();

        this.isEuDate = true;
        this.isShortFormat = true;
        this.isTime = true;

        this.addEventListener("click", e => {
            this.formatSwitch();                
        });

        this.addEventListener("contextmenu", e => {
            e.preventDefault();
            this.menuSwitch();
        });
    };

    formatSwitch(){ 
        if(this.isTime){
            this.isShortFormat = !this.isShortFormat;
            this.showTime();
            } else{
                this.isEuDate = !this.isEuDate;
                this.showDate();
            };
    };

    menuSwitch(){
        if(this.isTime){            
            this.isTime = !this.isTime;
            this.showDate();
            } else{
                this.isTime = !this.isTime;
                this.showTime();
            };
        };    

    connectedCallback(){
        const template = document.querySelector('template');       
        const shadowRoot = this.attachShadow ({mode: 'open'});        
        const content = document.importNode (template.content, true);

        shadowRoot.appendChild(content);

        this.clockCalendar = shadowRoot.querySelector('.clock-calendar');

        this.getTime();
        this.showTime();
    };

    getTime(){
        let date = new Date();
        let currentTime = date.toLocaleTimeString ("uk-UA");

        if(this.isShortFormat) currentTime = date.toLocaleTimeString ("uk-UA", {hour:"2-digit",minute:"2-digit",});;
        this.clockCalendar.innerHTML = currentTime;                             
    };    

    getDate(){     
        let date = new Date();  
        let currentDate = date.toLocaleDateString ("uk-UA");

        if(this.isEuDate)currentDate = date.toLocaleDateString ("en-US", {year:"2-digit",month:"2-digit", day:"2-digit"});        
        this.clockCalendar.innerHTML = currentDate;        
    };

    showTime(){   
        clearInterval(this.timer);          
        this.timer = setInterval(this.getTime.bind(this),1000);
        this.getTime();
                
    };   
    
    showDate(){        
        clearInterval(this.timer);           
        this.timer =  setInterval(this.getDate.bind(this),60000);
        this.getDate();       
        
    };            
};
customElements.define("clock-calendar", ClockCalendar);











