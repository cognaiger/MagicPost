export enum Role {
    Boss = 'Boss',
    EPManager = 'EPManager',
    EPOperator = 'EPOperator',
    CPManager = 'CPManager',
    CPStaff = 'CPStaff',
    Client = 'Client'
}

export enum PointType {
    TPoint = 'EPoint',
    CPoint = 'CPoint'
}

export enum PackageType {
    Document = 'Document',
    Good = 'Good'
}

export enum FailOption {
    Op1 = 'Return immediately',
    Op2 = 'Return before the date',
    Op3 = 'Return when the storage time expires',
    Op4 = 'Call the sender',
    Op5 = 'Cancel'
}

export enum BillStatus {
    Pending = "Pending",
    InTransit = "In transit",
    ReachDesEP = "Reach destination exchange point",
    Delivered = "Delivered",
    FailAttempt = "Fail attempt"
}

export enum OrderStatus {
    NotConfirmed = 'Not confirmed',
    Confirmeed = 'Confirmed',
    Cancel = 'Cancel'
}