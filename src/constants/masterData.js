import {
    STATUS_ACTIVE,
    STATUS_LOCK,
    GroupPermissonTypes,
} from './';

export const groupPermissionTypes = [
    { value: GroupPermissonTypes.ADMIN, label: 'Administrator' },
    { value: GroupPermissonTypes.AGENCY, label: 'Agency'},
    { value: GroupPermissonTypes.CUSTOMER, label: 'Customer'}
]

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    // { value: STATUS_INACTIVE, label: 'Inactive', color: 'warning' },
    { value: STATUS_LOCK, label: 'Lock', color: 'red' },
]

export const commonLanguages = [
    { value: 'vi', label: 'Việt Nam'},
    { value: 'en', label: 'English'},
    { value: 'de', label: 'German'},
]

export const commonKinds = [
    { value: 1, label: 'Tin tức'},
    { value: 2, label: 'Dịch vụ'},
]

export const commonSex = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' }
]

export const config = {
    apiKey: "AIzaSyDQcKlBQFksavXqSrmF1urdBmkZevXQSBI",
    authDomain: "scrum-teamboard.firebaseapp.com",
    databaseURL: "https://scrum-teamboard-default-rtdb.firebaseio.com",
    projectId: "scrum-teamboard",
    storageBucket: "scrum-teamboard.appspot.com",
    messagingSenderId: "1065118142890",
};
