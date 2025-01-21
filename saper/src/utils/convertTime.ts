const convertTime = (time: number) => {
    const convertedTime = {
        minutes: "",
        seconds: ""
    }

    const minutes = Math.floor( time / 60 )
    const seconds = time - minutes * 60

    if( minutes < 10 ) {
        convertedTime.minutes =  "0" + minutes 
    }else convertedTime.minutes = minutes.toString()

    if( seconds < 10 ) {
        convertedTime.seconds =  "0" + seconds 
    }else convertedTime.seconds = seconds.toString() 

    return convertedTime;
}

export default convertTime