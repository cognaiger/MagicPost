export const FailOption = Object.freeze({
    Op1: 'Return immediately',
    Op2: 'Return before the date',
    Op3: 'Return when the storage time expires',
    Op4: 'Call the sender',
    Op5: 'Cancel'
})

export const POINTTYPE = {
    TPoint: 'EPoint',
    CPoint: 'CPoint'
}

export const ROLE = {
    BOSS: 'Boss',
    EPMANAGER: 'EPManager',
    CPMANAGER: 'CPManager',
    EPOPERATOR: 'EPOperator',
    CPSTAFF: 'CPStaff',
    CLIENT: 'Client'
}

export const BILLSTATUS = {
    PENDING: "Pending",
    INTRANSIT1: "In transit 1",
    ATCP1: 'At collection point 1',
    INTRANSIT2: 'In transit 2',
    ATCP2: 'At collection point 2',
    INTRANSIT3: 'In transit 3',
    INTRANSIT4: "In transit 4",
    REACHDESEP: "Reach destination exchange point",
    DELIVERED: "Delivered",
    FAILATTEMPT: "Fail attempt",
    RETURN: 'Return'
}

export const ORDERSTATUS = {
    NOTCONFIRMED: 'Not confirmed',
    CONFIRMED: 'Confirmed',
    CANCEL: 'Cancel' 
}

export const CONFIRMORDER = {
    SUCCESSDELIVER: 'Success Deliver',
    FAILDELIVER: 'Fail Deliver',
    RECEIVEBILL: 'Receive Bill',
    NOTRECEIVEBILL: 'Not Receive Bill'
}

export const ORDERTYPE = {
    TOCP1: "To collection point 1",
    TOCP2: "To collection point 2",
    TODESEP: "To destination exchange point",
    TOCUS: "To customer"
}


export const CUSTOMERPOINT = '656b4524130a2b089708c464';

export const formatTime = (dateString) => {
    let res = '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    res += hour < 10 ? `0${hour}h:` : `${hour}h:`;
    res += min < 10 ? `0${min}m:` : `${min}m:`;
    res += sec < 10 ? `0${sec}s ` : `${sec}s `;
    res += day < 10 ? `0${day}/` : `${day}/`;
    res += month < 10 ? `0${month}/` : `${month}/`;
    res += year;
    return res;
  }