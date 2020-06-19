![CreditAPI LOGO](https://creditapi.ru/assets/img/favicon.png)
https://creditapi.ru
# Credit API JS SDK v1.0.5
## JavaScript библиотека для работы с CreditAPI 

### v1.0.7

1. Added method createRequestForUpdateUserdata(data) to create a request to update users' personal data
2. Added method getSignedDocument(id) to request signed document

### v1.0.6

1. loan.payment_schedule is deprecated. Please call method getPaymentSchedule(loan_id) instead

2. If you need initial payment schedule, please use loan.initial_payment_schedule

3. Added method getTransactions()



### v1.0.5

    
1. getCards(),linkCard(),unlinkCard() is now deprecated and will be removed after Nov. 2020. Use getPaymentAccounts(),linkPaymentAccount(),unlinkPaymentAccount() instead.

2. newLoan() method should receive payment_account_id instead of card_id

3. Added method calculate() to calculate required payment amount to pay today

4. Added method makePayment() to initialte early payments or payments from different card.

### v1.0.4

1. Messages methods added