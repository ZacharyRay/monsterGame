new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        newGame: false,
        list: []
    },
    methods: {
        startNewGame: function(){
            this.newGame = !this.newGame;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.list = [];
        },
        attack: function(){
            this.monsterAttack();
            this.playerAttack();
            if(this.checkWin()){
                return
            }
 
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.monsterAttack();
            this.list.unshift({
                isPlayer: true,
                text: 'player hits monster hard with ' + damage
            });
            if(this.checkWin()){
                return
            }
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();
            this.list.unshift({
                isPlayer: true,
                text: 'player heals with 10'
            })
        },
        giveUp: function(){
            this.newGame = false;
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(3, 10);
            this.playerHealth -= damage;
            this.list.unshift({
                isPlayer: false,
                text: 'monster hits player with ' + damage
            })
        },
        playerAttack: function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.list.unshift({
                isPlayer: true,
                text: 'Player hits monster with ' + damage
            })
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.playerHealth <= 0){
                if(confirm('You lost! New game?')){
                    this.startNewGame();
                } else {
                    this.newGame = false;
                } return true;
            }   else if(this.monsterHealth <= 0){
                if(confirm('You won! New game?')){
                    this.startNewGame();
                } else {
                    this.newGame = false;
                } return true;
            } return false;
        }
    }
})