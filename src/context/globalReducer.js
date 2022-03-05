export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_USER_DATA":
            return {
                ...state,
                userData: action.userData,
            };
        default:
            return state;
    }
};
