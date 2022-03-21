
const currYear = new Date().getFullYear();
document.getElementById("curr-year").innerText="© copyright "+ currYear +" ThePaulin";




class Calculator {
    constructor(prevOpTxtElt,currOpTxtElt){
        this.prevOpTxtElt = prevOpTxtElt
        this.currOpTxtElt = currOpTxtElt
        //reset everything after calc starts
        this.clear()
    }
    clear(){
        //reset variables
        this.currOperand =''
        this.prevOperand= ''
        this.operation = undefined
        //reset all the innerText displayed
        this.currOpTxtElt.innerText = this.currOperand
        this.prevOpTxtElt.innerText = this.prevOperand

    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    //append number to currOperand variable (current operand)
    appendNumber(number){



        if (number === "."){
            if(this.currOperand.includes(".")){
                return
            }
            
        }

        this.currOperand = this.currOperand.toString() + number.toString()
        
        console.log(this.currOperand)
    }
    chooseOperation(operation){
        if(this.currOperand ==='')return
        if(this.prevOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        // + " " + this.operation
        this.currOperand =''
    }
    changeSign(){
        this.currOperand = this.currOperand * (-1)
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)

        // let isInt
        
        // function isInt(number){
        //     if( Math.floor(number)=== number ){
        //         return true
        //     }else{
        //         return false
        //     }
            
        // }


        if (isNaN(prev) || isNaN(curr))return

        let prevType 
        let currType 

        function getPrevtype(){
            
            if(Number.isInteger(prev)){
                prevType = 'integer'
                console.log("prevType "+prevType)
            }else{
                prevType = 'float'
                console.log("prevType "+prevType)
            }
           
        }
        getPrevtype()

        function getCurrtype(){
            
            if(Number.isInteger(curr)){
                currType ='integer'
                console.log("currType "+currType)
            }else{
                currType = 'float'
                console.log("currType "+ currType)
            }
           
        }
        getCurrtype()





        let prevString = this.prevOperand
        let currString = this.currOperand

        let prevErr
        let currErr

        console.log("got to switch" + prevType)

       switch(prevType){
           
           case "integer":
            console.log("prev is integer")
               prevErr = 0
               switch(currType){
                   case 'integer':
                       currErr = 0
                       break
                    case 'float':
                        currErr = (currString.split('.')[1]).length
                        break
                    default:
                        currErr = 0

               }
               break
            case "float":
                console.log("prev is float")
                prevErr = (prevString.split('.')[1]).length
                console.log("prevErr = " + prevErr)
               
                switch(currType){
                    case 'integer':
                        currErr = 0
                        break
                    case 'float':
                        currErr = (currString.split('.')[1]).length
                        break
                    default:
                        currErr =0
                }
                break
            default:
                prevErr = 0
                currErr = 0
       }



        // if ((isInt(prev))!==true){
            
        //     prevErr = parseFloat(prevString.split('.')[1]).length
        // }else{
        //     prevErr = 0
        // }

        // if ((isInt(curr))!==false){
            
        //     currErr = parseFloat(currString.split('.')[1]).length
        // }else{
        //     currErr = 0
        // }

        
        

        switch(this.operation){
            case "+" :

                
                
                computation = (prev + curr).toFixed(Math.max(prevErr,currErr))           
                
            break
            case "-":
                computation = (prev - curr).toFixed(Math.max(prevErr,currErr))    
            break
            case "x":
                computation = (prev * curr).toFixed(prevErr+currErr)  
            break
            case "÷":
                computation = (prev / curr).toFixed(prevErr+currErr)    
            break
            default:
                return           
        }
        this.currOperand = computation     
        this.operation = undefined  
        this.updateDisplay()
        
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        
        // const integerDigits = Number(stringNumber.split('.')[0])
        // const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decimalDigits !=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
        
    }
    updateDisplay(){ 
        // console.log(currOpTxtElt)
        


        this.currOpTxtElt.innerHTML = this.getDisplayNumber(this.currOperand)

        if(this.operation != null){
            this.prevOpTxtElt.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        }else{
            this.prevOpTxtElt.innerText = ''
        }
        
        
        

        

        
    }
}



const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');

const equalButton = document.querySelector('[data-equals]');
const allClearButton =document.querySelector('[data-all-clear]');
const delButton =document.querySelector('[data-del]');
const signButton = document.querySelector('[data-sign]')

const prevOpTxtElt = document.querySelector('[data-prevOp]');
const currOpTxtElt = document.querySelector('[data-currOp]');





const calculator = new Calculator(prevOpTxtElt,currOpTxtElt);

numButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

signButton.addEventListener('click', button=>{
    calculator.changeSign()
    calculator.updateDisplay()
})

equalButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
} )

delButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
} )
