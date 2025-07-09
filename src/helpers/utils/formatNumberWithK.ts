
export const formatNumberWithK = (number: any) =>{
    if(number === 0 || !number) {
        return "0"
    } else {
        return number > 999 ? `${Math.trunc(number / 1000)}k` : number
    }
}

export const numberFormatNaire = (x: any) => { 
    return "₦"+Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};
 
export const numberFormatDollar = (x: any) => { 
    return "$"+Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};
 
export const numberFormat = (x: any) => { 
    return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  
};