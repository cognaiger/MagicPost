export const FailOption = Object.freeze({
    Op1: 'Return immediately',
    Op2: 'Return before the date',
    Op3: 'Return when the storage time expires',
    Op4: 'Call the sender',
    Op5: 'Cancel'
})

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