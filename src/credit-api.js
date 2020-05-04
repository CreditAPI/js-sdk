const CreditApi ={
  url:null,
  orgId:null,
  token:null,
  User:null,
  credit_products:null,
  cards:null,
  last_message:null,
  last_message_unreaded:false,
  init(url,orgId) {
    this.url=url;
    this.orgId=orgId;
    console.log('CreditAPI initialized for orgID '+this.orgId);
  },
  refreshUser(){
    return new Promise((resolve,reject)=>{
      if (localStorage.getItem('token')) {
        this.token=localStorage.getItem('token');
        this.makeRequest("GET","/users/me").then(user=>{
          if (user.sessionToken) {
            this.User=user;
            if (user.emailOriginal) {
              this.User.email=user.emailOriginal;
              this.User.username=user.phone;
            }
            resolve(user);
          } else {
            this.token=null;
            localStorage.removeItem('token');
            resolve(null);
          }
        }).catch(err=>{
          this.token=null;
          localStorage.removeItem('token');
          reject(err);
        });
      } else {
        this.token=null;
        localStorage.removeItem('token');
        resolve(null);
      }
    });
  },
  login(user,pwd){
    return new Promise((resolve,reject)=>{
      this.User=null;
      this.token=null;
      this.makeRequest("POST","/users/login",{username:user,password:pwd}).then(user=>{
        if (user.sessionToken) {
          this.token=user.sessionToken;
          localStorage.setItem('token', user.sessionToken);
          this.User=user;
          resolve(user);
        } else 
          reject(user);
      }).catch(err=>{
        reject(err);
      });
      
    })
  },
  logout(){
     this.User=null;
     this.token=null;
     localStorage.removeItem('token');
  },
  signup(email,phone,pwd){
    return new Promise((resolve,reject)=>{
      this.User=null;
      this.token=null;
      this.makeRequest("POST","/users/signup",{email:email,phone:phone,password:pwd}).then(user=>{
        if (user.sessionToken) {
          this.token=user.sessionToken;
          localStorage.setItem('token', user.sessionToken);
          this.User=user;
          resolve(user);
        } else 
          reject(user);
      }).catch(err=>{
        reject(err);
      });
      
    })
  },
  saveUserdata(data){
    return this.makeRequest("PUT","/users/"+this.User.objectId,data);
  },
  getCreditProducts(refresh=false){
    return new Promise((resolve,reject)=>{
      if ((this.credit_products)&&(!refresh))
        resolve(this.credit_products);
      else this.makeRequest("GET","/classes/credit_product").then(result=>{
        this.credit_products=result.results;
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  getCreditProduct(id){
    return this.makeRequest("GET","/classes/credit_product/"+id);
  },
  getLoans(){
    return new Promise((resolve,reject)=>{
      this.makeRequest("GET","/classes/loan").then(result=>{
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  getOpenedLoans(){
    return new Promise((resolve,reject)=>{
      this.makeRequest("GET",'/classes/loan?where={"closed":false}').then(result=>{
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  getLoan(id){
    return this.makeRequest("GET","/classes/loan/"+id);
  },
  getMoney(id){
    return this.makeRequest("POST","/functions/sendmoney",{loan:id});
  },
  getCards(refresh=false){
    return new Promise((resolve,reject)=>{
      if ((this.cards)&&(!refresh)) {
        resolve(this.cards);
      } else this.makeRequest("GET","/classes/card").then(result=>{
        this.cards=result.results;
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  linkCard(return_url){
    return new Promise((resolve,reject)=>{
      this.makeRequest("POST","/functions/linkcard",{return_url:return_url}).then(result=>{
        resolve(result.result.url);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  unlinkCard(id){
    return new Promise((resolve,reject)=>{
      this.makeRequest("POST","/functions/unlinkcard",{id:id}).then(result=>{
        this.getCards(true);
        resolve(result);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  getApplicationFields(credit_product_id=null){
    return new Promise((resolve,reject)=>{
      if (credit_product_id)
        resolve(this.makeRequest("GET","/credit_product/"+credit_product_id+"/fields"));
      else {
        this.getCreditProducts().then(credit_products=>{
          if ((credit_products.results)&&(credit_products.results[0])) {
            resolve(this.makeRequest("GET","/credit_product/"+credit_products.results[0].objectId+"/fields"));
          } else if (credit_products[0]) {
            resolve(this.makeRequest("GET","/credit_product/"+credit_products[0].objectId+"/fields"));
          } else
            reject({'message':"No credit products available"});
        }).catch(err=>{reject(err)});
      }

    });
  },
  sendVerificationCode(){
    return this.makeRequest("POST","/functions/verification");
  },
  checkVerificationCode(sms_code){
    return new Promise((resolve,reject)=>{
      this.makeRequest("POST","/functions/checksms",{sms_code:sms_code}).then(res=>{
        if ((res.result)&&(res.result.code)&&(res.result.code==202))
          reject(res.result);
        else
          resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  newLoan(credit_product,amount,term,card_id){
    return this.makeRequest("POST","/classes/loan",{credit_product:credit_product,amount:parseInt(amount),term:parseInt(term),card:card_id});
  },
  cancelLoan(id) {
    return this.makeRequest("GET","/loan/"+id+"/cancel");
  },
  getRequiredDocuments(){
    return new Promise((resolve,reject)=>{
      this.makeRequest("GET","/classes/document").then(result=>{
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  getDocument(name){
    return new Promise((resolve,reject)=>{
      this.makeRequest("GET","/document/"+name).then(content=>{
        if (typeof content === 'object') {
          reject(content.message);
        } else resolve(content);
      }).catch(err=>{
        reject(err);
      });;
    });
  },
  signDocument(name){
    return this.makeRequest("PUT","/document/"+name);
  },
  getWebsiteStyle(id){
    return this.makeRequest("GET","/classes/website/"+id);
  },
  getMessages(limit=0,offset=0,nomark=false){
    return new Promise((resolve,reject)=>{
      let url="/classes/message?order=-createdAt";
      if (limit)
        url+="&limit="+limit;
      if (offset)
        url+="&offset="+offset;
      let headers=null;
      if (nomark){
        headers={'x-dont-mark-as-readed':true};
      }
      this.makeRequest("GET",url,null,headers).then(result=>{
        resolve(result.results);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  sendMessage(message) {
    return this.makeRequest("POST","/classes/message",message);
  },
  updateLastMessage(){
    return new Promise((resolve,reject)=>{
      this.getMessages(1,0,true).then((result)=>{
        this.last_message=result[0];
        if ((this.last_message['sender_email']!=this.User.email)&&((!this.last_message['readedAt'])||(this.last_message['need_answer']))) {
          this.last_message_unreaded=true;
        } else {
          this.last_message_unreaded=false;
        }
        resolve(this.last_message);
      }).catch(err=>{
        reject(err);
      });
    });
  },
  enableLastMessageAutoupdate(interval=5){
    this.updateLastMessage().then(()=>{
      setTimeout(()=>{
        this.enableLastMessageAutoupdate(interval);
      },interval*1000);
    });
  },
  uploadFile(name,content_type,image_data) {
    return this.makeRequest("POST","/files/"+name,image_data,{'Content-Type':content_type});
  },
  makeRequest(method,query,params=null,headers=null) {
    var that=this;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, that.url+query);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          var response=xhr.response;
          try {
            response=JSON.parse(response);
          } catch (e) {}
          resolve(response);
        } else {
          try {
            var jsonerr=JSON.parse(xhr.response);
            if (jsonerr)
              reject({
                status: xhr.status,
                code: jsonerr.code,
                message: jsonerr.error
              });
          } catch(err) {
            reject({
              status: xhr.status,
              message: 'Error '+xhr.status+'.'+xhr.statusText
            });
          }
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          message: xhr.statusText
        });
      };
      if ((headers)&&(typeof headers == 'object'))
        for (var k in headers){
          xhr.setRequestHeader(k,headers[k]);
      } 
      if ((params)&& (typeof params == 'object') && ((!headers)||(!headers['Content-Type']))) {
        xhr.setRequestHeader('Content-Type','application/json');
      }
      if (that.token)
        xhr.setRequestHeader('X-Parse-Session-Token', that.token);
      else if (that.orgId)
        xhr.setRequestHeader('X-Org-Id', that.orgId);     
      else
        reject ('CreditApi is not initialized');
      if (params) 
        if ((typeof params == 'object')&&(!(params instanceof Blob))) {
          xhr.send(JSON.stringify(params));
        } else {
          xhr.send(params);
        }
      else
        xhr.send();
    });
  }
}
CreditApi.CreditApi = CreditApi;
export default CreditApi;