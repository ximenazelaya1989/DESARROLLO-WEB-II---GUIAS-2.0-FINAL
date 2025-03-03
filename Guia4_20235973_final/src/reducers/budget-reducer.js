
const initialBudget = () => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? parseFloat(localStorageBudget) : 0
}

const localStorageExpenses = () => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: "",
    currentCategory: ""
}

export const budgetReducer = (state, action) => {

    switch (action.type) {
        case "add-budget":
            localStorage.setItem('budget', action.payload.budget.toString())
            return { ...state, budget: action.payload.budget }
        case "show-modal":
            return { ...state, modal: true }
        case "add-expense":
            return { ...state, expenses: [...state.expenses, { ...action.payload.expense, id: new Date().getTime() }], modal: false }
        case "remove-expense":
            return {
                ...state, expenses: state.expenses.filter(expense => expense.id != action.payload.id)
            }
        case "get-expense-by-id":
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }
        case "update-expense":
            return {
                ...state, expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                    action.payload.expense :
                    expense),
                modal: false,
                editingId: ""
            }

        case "close-modal":
            return {
                ...state,
                modal: false,
                editingId: ""
            }
        case "add-filter-category":
            return { ...state, currentCategory: action.payload.categoryId }

        case "reset-app":
            localStorage.removeItem("budget");
            localStorage.removeItem("expenses");
            return {
                budget: 0,
                expenses: [],
                editingId: "",
                modal: false,
                currentCategory: ""
            }

        default:
            return state;
    }
}