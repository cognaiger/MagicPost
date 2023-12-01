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
    INTRANSIT: "In transit",
    REACHDESEP: "Reach destination exchange point",
    DELIVERED: "Delivered",
    FAILATTEMPT: "Fail attempt"
}