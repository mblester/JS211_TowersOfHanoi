"use strict"

class BankAccount {
    constructor(accountNumber, owner){
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []
    }
    balance(){
        let sum = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            sum += this.transactions[i].amount;
        }
        return sum;
    }
    
    charge(payee, amt){
    //     let currentBalance = this.balance();
    //     if(amt >= currentBalance) {
    //         //do nothing
    //     } else {
    //         let chargeTransaction = new Transaction(-amt, payee);
    //         this.transactions.push(chargeTransaction);
    //     }
    // }
        if(this.balance() >= amt) {
            let charge = new Transaction((amt * -1), payee);
            this.transactions.push(charge)
        } 
    }

    deposit(amt){
        if(amt>0){
        let depositTransaction = new Transaction(amt, 'Deposit');
        this.transactions.push(depositTransaction);
        } else (
            console.log("Your deposit is in the negative. Please try again.")
        )
    }
}

class Transaction {
    constructor(amount, payee){
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}

//tests
if (typeof describe === 'function') {
    const assert = require('assert');

    describe("#testing account creation", function(){
        it ('should create a new account directly', function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.owner, "James Doe");
            assert.equal(acct1.accountNumber, 'xx4432');
            assert.equal(acct1.transactions.length, 0);
            assert.equal(acct1.balance(), 0);
        });
    });
    describe("#testing account balance", function(){
        it ('should create a new account correctly', function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.charge("Target", 10);
            //assert.equal(acct1.balance(), 90);
        });
        it ('should now allow a negative deposit', function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.deposit(-30);
            assert.equal(acct1.balance(), 100);
        });
        it ('should now allow charging to overdraft', function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.charge("Target", 30);
            assert.equal(acct1.balance(), 0);
         
        });
        it ('should allow a refund', function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.charge("Target", -30);
            assert.equal(acct1.balance(), 30);
         
        });
    });

    describe("#Testing transaction creation", function() {
        it("Should create a transaction correctly for deposit", function(){
            let t1 = new Transaction(30, "Deposit");
            assert.equal(t1.amount, 30);
            assert.equal(t1.payee, "Deposit");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);

        });
            it("Should create a transaction correctly for a charge", function(){
                let t1 = new Transaction(-34.45, "Target");
                assert.equal(t1.amount, -34.45);
                assert.equal(t1.payee, "Target");
                assert.notEqual(t1.date, undefined);
                assert.notEqual(t1.date, null);
    
            });
        
    });

    describe("Bunch of transactions and tests", function() {
        let bigAccount = new BankAccount("11223344", "Maggie Smith");
        it("test account created correctly", function(){
            assert.equal("11223344", bigAccount.accountNumber);
            assert.equal("Maggie Smith", bigAccount.owner);
            assert.equal(bigAccount.balance(), 0);
        })
        it("test deposits", function(){
            bigAccount.deposit(30);
            bigAccount.deposit(20);
            bigAccount.deposit(-3);
            bigAccount.deposit(34.25);
            bigAccount.deposit(10000.45);
            assert.equal(10084.70, bigAccount.balance());
            bigAccount.charge("clearout", 10084.70);
            assert.equal(0, bigAccount.balance());
        })
        it("test charges", function(){
            bigAccount.deposit(1000);
            bigAccount.charge("Target", 40);
            bigAccount.charge("Freebirds", 10.32);
            bigAccount.charge("Stripes", 40);
            bigAccount.charge("Sonic", -20);
            assert.equal(929.68, bigAccount.balance());
            assert.equal(10, bigAccount.transactions.length);
        })
    })
    
}