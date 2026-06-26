export default (rentPerDay:number,dayOfRent:number)=>{
    const rent = rentPerDay*dayOfRent;
    const tax = rent* 0.1;
    const discount = 0;
    const total =( rent+tax )-discount
    return {
        rent,
        tax,
        discount,
        total
    }
}