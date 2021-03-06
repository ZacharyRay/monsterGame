new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        newGame: false,
        turns: []
    },
    methods: {
        startNewGame: function(){
            this.newGame = !this.newGame;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            this.monsterAttacks();
            if(this.checkWin()){
                return
            }
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            this.monsterAttacks();
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
            this.monsterAttacks();
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10',
            });
        },
        giveUp: function(){
            this.newGame = false;
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            });
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('You won! New game?')){
                    this.startNewGame();
                } else {
                    this.newGame = false;
                } return true;
            } else if(this.playerHealth <= 0) {
                if(confirm('You lost! New game?')){
                    this.startNewGame();
                } else {
                    this.newGame = false;
                } return true;
            } return false;
        }
    }
})