import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import PlanetsPage from '../pages/PlanetsPage'
import { expect, test } from 'vitest'
import { limitSentence } from '../components/LimitSentence'
import Card from '../components/Card'
const { JSDOM } = require('jsdom');

// Create a mock document
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;


test('hola esta noche vemos una peli y limite 10', () => {
    expect(limitSentence("hola esta noche vemos una peli", 10)).toBe("hola ...")
})

test('hola buscamos una buena locura y limite 20', () => {
    expect(limitSentence("hola buscamos una buena locura", 20)).toBe("hola buscamos ...")
})

test('buscaremos el tesoro escondido y limite 4', () => {
    expect(limitSentence("buscaremos el tesoro escondido", 4)).toBe("...")
})

test('estoy mirando algunos pisos y limite 50', () => {
    expect(limitSentence("estoy mirando algunos pisos", 50)).toBe("estoy mirando algunos pisos")
})

test('buscaremos el tesoro escondido y limite 14', () => {
    expect(limitSentence("buscaremos el tesoro escondido", 14)).toBe("buscaremos ...")
})

test(' y limite 50', () => {
    expect(limitSentence("", 50)).toBe("...")
})

test('load and render data correctly', async() => {
    // render(<Card />)

    // const rows = screen.findAllByRole("tr")
    // expect(rows.length).toBe(20)
})