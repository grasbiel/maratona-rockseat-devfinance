const Modal = {
    open() {
        //Abrir modal
        //Adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        //Fechar o modal
        //remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const transactions = [
    {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
}, {
    description: "Website",
    amount: 500000,
    date: '23/01/2021'
    
}, {
    description: "Internet",
    amount: -20000,
    date: '23/01/2021'
}, {
    description: "APP",
    amount: 200000,
    date: '23/01/2021'
}
]

// Eu preciso somar as entradas
// depois eu preciso somar as saídas e
// remover das entradas o valor das saídas
// assim, eu terei o total
const Transaction = {
    all:transactions,
    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();

    },

    remove (index) {
        Transaction.all.splice(index,1)
        App.reload()
    },
    
    incomes () {
        //somar as entradas

        let income = 0;

        //pegar todas as transacoes
        // para cada transacao
        Transaction.all.forEach((transaction) => {
            // se ela for maior que zero
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        // somar a uma variável e retorná-la
        return income;
    },
    expenses() {
        //somar as saídas
        let expense = 0;

        //pegar todas as transacoes
        //para cada transacao
        Transaction.all.forEach((transaction) => {
            //se ela for menor que zero
            if (transaction.amount < 0) {
                expense -= transaction.amount;
            }
        })
        // somar a uma variavel e retorná-la
        return expense;
    },
    total() {
        //total de entradas e saídas
        return Transaction.incomes() - Transaction.expenses();
    }
}

// Substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        
        const image = transaction.amount > 0 ? "./assets/plus.svg" : "./assets/minus.svg";
        
        const amount = Utils.formatCurrency(transaction.amount);
        
        const html = ` 
            <td class="description"> ${transaction.description} </td>
            <td class="${CSSclass}"> ${amount} </td>
            <td class="date">${transaction.date} </td>
            <td>
                <img src="${image}" alt="Remover transação">
            </td>
            `

        return html;
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency (value) {

       const signal = Number(value) < 0 ? "-" : ""

       value = String(value).replace(/\D/g,"")

       value = Number(value) / 100

       value = value.toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
       })

       return signal + value;
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),


    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    
    formatData(){

    },

    validateFields() {
        const {description, amount, date} = Form.getValues();

        if (description.trim() === "" || 
            amount.trim() === "" ||
            date.trim()=== "") {
                throw new Error("Por favor, preencha todos os campos");
            }
    },
    submit(event) {
        
        event.preventDefault()

        try {
            // verificar se todas as informações estão preenchidas
            Form.validateFields()

            // formatar os dados para salvar
            Form.formatData()
            // salvar
            // apagar os dados do formulário
            // modal feche
            // atualizar a aplicação
        }
        
        
    }
}

const App = {
    init () {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalance();

    },

    reload () {
        DOM.clearTransactions();
        App.init();
    }
}

App.init()

Transaction.remove(0)