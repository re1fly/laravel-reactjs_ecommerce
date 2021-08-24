export const BASE = 'http://localhost:8000/api/';

export const CREATE_PRODUCT = BASE + 'upload-product';
export const UPDATE_PRODUCT = (id) => {
    return BASE + 'update-product/' + id;
}
export const DELETE_PRODUCT = (id) => {
    return BASE + 'delete-product/' + id;
}

export const GET_ALL_CLOTHES = BASE + 'all-clothes'
export const GET_MEN_CLOTHES = BASE + 'men-clothes';
export const GET_MEN_NEW_ARRIVALS = BASE + 'men-new-arrivals';
export const GET_WOMEN_CLOTHES = BASE + 'women-clothes';
export const GET_WOMEN_NEW_ARRIVALS = BASE + 'women-new-arrivals';
export const GET_KIDS_CLOTHES = BASE + 'kids-clothes';
export const GET_KIDS_NEW_ARRIVALS = BASE + 'kids-new-arrivals';


