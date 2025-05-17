const transactionsEl = document.querySelector(".transactions");
const balanceNumberEl = document.querySelector(".balance-number");
const numberIncomeEl = document.querySelector(".number--income");
const numberExpensesEl = document.querySelector(".number--expenses");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");


const submitHandler = (e) => {
    //prevent default behaviour
    e.preventDefault();

    //get the values from the input fields
    const description = inputDescriptionEl.value;
    const amount = +inputAmountEl.value;

    //create a new transaction element
    const transactionItemHTML = `
        <li class="transaction transaction--${amount > 0 ? 'income' : 'expense'}">
          <span class="transaction__text">${description}</span>
          <span class="transaction__amount">${amount > 0 ? '+' : ''}${amount}</span>
          <button class="transaction__btn">X</button>
        </li>
    `;

    //inser the HTML
    transactionsEl.insertAdjacentHTML('beforeend', transactionItemHTML);

    //clear the form values
    inputDescriptionEl.value = '';
    inputAmountEl.value = '';

    // Unfocus (blur) the from inputs
    inputDescriptionEl.blur();``
    inputAmountEl.blur();

    //add and sub the expenses
    if(amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const upadtedIncome = currentIncome + amount;
        numberIncomeEl.textContent = upadtedIncome;
    }else{
        const currentExpenses = +numberExpensesEl.textContent;
        const upadtedExpenses = currentExpenses + (-amount);
        numberExpensesEl.textContent = upadtedExpenses;
    }

    // upadted balance
    const updatedBalance = (+numberIncomeEl.textContent) - (+numberExpensesEl.textContent);
    balanceNumberEl.textContent = updatedBalance;

    //make red if balance negative
    if (income - expenses < 0) {
        balanceNumberEl.style.color = "red";
    }else {
        balanceNumberEl.style.color = "green";
    }
}

formEl.addEventListener("submit", submitHandler);

const clickHandler = (e) => {
    //remove the transaction from the list visually
    const clickedEl = e.target.parentNode;
    clickedEl.remove();
 
     // update income or expense
    const amountEl = clickedEl.querySelector(".transaction__amount");
    const amount  = +amountEl.textContent;
 
    if(amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const upadtedIncome = currentIncome - amount;
        numberIncomeEl.textContent = upadtedIncome;
    }else{
        const currentExpenses = +numberExpensesEl.textContent;
        const upadtedExpenses = currentExpenses - (-amount);
        numberExpensesEl.textContent = upadtedExpenses;
    }
     
     // update balance 
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    balanceNumberEl.textContent = income - expenses;
 
    //make red if balance negative
    if (income - expenses < 0) {
        balanceNumberEl.style.color = "red";
    }else {
        balanceNumberEl.style.color = "green";
    }
}

transactionsEl.addEventListener("click", clickHandler);