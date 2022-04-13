import React, { Component } from "react";
import './Calculator.css'

import Button from '../components/Button'
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,  0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        }
        else { // pega a operação anterior 
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // executa uma operação e armazena no values, zerando o índice 1 do array
                // eval pode ser refatorado usandos switch
            } catch(e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation, // se o digito de operação n for igual a '=', ele vai usar pra fazer a próxima operação, armazenando qual a operação em um novo valor para operation
                current: equals ? 0: 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        // Se o usuário digitou um ponto, e já tem um ponto, sai da função na parte de add dígito
        if (n === '.' && this.state.displayValue.includes('.')) {
            return 
        }

        // limpar qnd o display tem só um zero e limpar qnd a variável clear display for true
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        // operação ternária, se for true, clearDisplay. Se for false, é displayValue msm
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        // dps que digita um valor, marca a tag como falso
        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            // armazenando no elemento[0] do array current
            const i = this.state.current // i de índice do current
            const newValue = parseFloat(displayValue) // display value já tem a função setState então ele pega sempre o número atualizado
            const values = [...this.state.values] // clona o array pra um outro e armazena em values
            values[i] = newValue
            this.setState({values}) // atribui o array ao estado do objeto
            console.log(values)
        }

        if (this.state.displayValue.length > 10) {
            console.log('Não pode valores com mais de X dígitos')
            this.setState({clearDisplay: true})
            return
        }
    }

    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>

                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>

                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>

                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>

                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}