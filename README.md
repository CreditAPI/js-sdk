![CreditAPI LOGO](https://creditapi.ru/assets/img/favicon.png)
https://creditapi.ru
# Credit API JS SDK
## JavaScript библиотека для работы с CreditAPI 

### Установка модуля
    node install credit-api
    
Возможно использование библиотеки в typescript приложениях

    import CreditApi from 'credit-api';
    
Или в качестве обычного JS класса

    const CreditApi = require('credit-api');

Перед началом использования библиотеки - ее необходимо инцициализировать

    CreditApi.init({CREDIT_API_HOST},{CREDIT_API_ORG});


### Доступные методы


    CreditApi.login(username,password) //авторизация. В качестве username может использоваться телефон или email

    CreditApi.signup(email,phone,password) //регистрация нового пользователя
    
    CreditApi.logout() //Удаление сессионного токена (Выход)
    
    CreditApi.refreshUser() //Загрузка текущего пользователя - необходимо вызывать каждый раз после загрузки страницы
    
    CreditApi.saveUserdata(data) //сохранение личных данных пользователя
    
    CreditApi.getCreditProducts() //получение списка кредитных продуктов
    
    CreditApi.getCreditProduct(id) //получение кредитного продукта по ID
    
    CreditApi.getLoans() //получение списка всех кредитов текущего пользователя
    
    CreditApi.getOpenedLoans() //получение списка открытых кредитов текущего пользователя
    
    CreditApi.getLoan(loan_id) // получение информации о заявке/кредите по ID
    
    CreditApi.getPaymentSchedule(loan_id) //получить график платежей (включая уже проведенные платежи и их статус)
    
    CreditApi.getMoney(loan_id) //запрос на перечисление денег по одобренной заявке
    
    CreditApi.getTransactions(loan_id) //получить список успешных транзакций по займу
    
    CreditApi.calculatePayment(loan_id) //рассчитать платеж на текущую дату (возвращается min, current, full)
    
    CreditApi.makePayment(loan_id,amount,prolong,payment_provider,payment_account,return_url,extra) //внести платеж
    
    CreditApi.getCards(refresh) /*deprecated, use getPaymentAccounts instead */ // получение списка карт пользователя (refresh=true, чтобы принудительно обновить список карт)
    
    CreditApi.linkCard(return_url) /*deprecated, use linkPaymentAccount instead */ //получить ссылку для привязки новой карты
    
    CreditApi.unlinkCard(id) /*deprecated, use unlinkPaymentAccount instead */ //отвязать карту

    CreditApi.getPaymentProviders(refresh) //получить список доступных для пользователя платежных провайдеров
    
    CreditApi.getPaymentAccounts(refresh) //получить список платежных аккаунтов пользователя
    
    CreditApi.getPayoutProvidersOnly() //получить список платежных провайдеров, поддерживающих масс. выплаты (для перечисления займов)
    
    CreditApi.getPayoutAccountsOnly() //получить список платежных аккаунтов пользователя, поддерживающих масс. выплаты (для перечисления займов)
    
    CreditApi.linkPaymentAccount(return_url,payment_provider) //привязать новый платежный аккаунт
    
    CreditApi.unlinkPaymentAccount(id) //отвязать платежный аккаунт
    
    CreditApi.getApplicationFields(credit_product_id) //получить список полей для анкеты. credit_product_id можно не указывать
    
    CreditApi.sendVerificationCode() //отправить код верификации на мобильный телефон пользователя
    
    CreditApi.checkVerificationCode(sms_code) //проверить код верификации 
    
    CreditApi.newLoan(credit_product,amount,term,card_id) //создать заявку на новый кредит
    
    CreditApi.cancelLoan(id) // отменить заявку на новый кредит
    
    CreditApi.getRequiredDocuments() //получить список документов, обязательный для размещения на сайте
    
    CreditApi.getDocument(name) //получить документ по наименованию
    
    CreditApi.signDocument(name,?code) //подписать документ 
    
    CreditApi.sendSMSforSigning(name) //Отправить СМС-код для электронного подписания документа (Для документов которые требуется подписать с помощью СМС)

    CreditApi.uploadFile(name,content_type,image_data) //закачать файл

    CreditApi.getMessages() //Получить список сообщений

    CreditApi.sendMessage(message) //Отправить сообщение оператору (message - объект вида {content:'CONTENT',attachments:[]})
    
### Доступные объекты

    CreditApi.User //текущий авторизованный пользователь
    
    
Порядок выдачи кредита описан в документе ["Общий порядок выдачи кредита"](https://creditapi.ru/assets/docs/CreditAPI%20Manual%20RU.pdf)

Подробное описание методов и объектов - в [личном кабинете](https://creditapi.ru/sandbox/) в разделе [Интеграция/Swagger](https://creditapi.ru/sandbox/#/integration/swagger)

Пример использования данной библиотеки и шаблон готового сайта здесь: https://github.com/CreditAPI/CreditApiTemplateApp

