new Vue({
    el: '#app',
    data: {
        description: '',
        amount: null,
        type: 'income',
        transactions: [],
        nextId: 1,
        chart: null,
    },
    methods: {
        addTransaction() {
            if (this.description && this.amount) {
                this.transactions.push({
                    id: this.nextId++,
                    description: this.description,
                    amount: this.amount,
                    type: this.type
                });
                this.description = '';
                this.amount = null;
                this.type = 'income';
                this.updateChart();
            }
        },
        updateChart() {
            const labels = this.transactions.map(t => t.description);

            const incomeData = this.transactions
                .filter(t => t.type === 'income')
                .map(t => t.amount);

            const expenseData = this.transactions
                .filter(t => t.type === 'expense')
                .map(t => t.amount);

            this.chart.data.labels = labels;
            this.chart.data.datasets[0].data = incomeData;
            this.chart.data.datasets[1].data = expenseData;

            this.chart.update();
        }
    },
    mounted() {
        const ctx = document.getElementById('expensesChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Ingresos',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gastos',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
