// @vitest-environment jsdom
import React from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render,screen,cleanup,within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import {initialAnswers, toggleOption} from './questions';
import {createReport} from './pdf';
afterEach(cleanup);
beforeEach(()=>{localStorage.clear();window.scrollTo=vi.fn();});
describe('vehicle inspection',()=>{
 it('allows a single option or no option for each question and preserves notes',async()=>{
 const user=userEvent.setup();render(<App/>);await user.click(screen.getByRole('button',{name:'Comenzar revisión'}));
 const group=screen.getByRole('group',{name:'¿Se realizó el cambio de aceite?'});
 const [yes,no,na]=within(group).getAllByRole('checkbox') as HTMLInputElement[];
 await user.click(yes);expect(yes.checked).toBe(true);await user.click(no);expect(yes.checked).toBe(false);expect(no.checked).toBe(true);expect(na.checked).toBe(false);
 await user.click(no);expect(no.checked).toBe(false);
 await user.type(screen.getAllByPlaceholderText('Agrega detalles si es necesario…')[0],'Aceite 5W-30');
 await user.click(screen.getByRole('button',{name:'Cambiar idioma'}));
 expect(screen.getByRole('heading',{name:'Was the engine oil changed?'})).toBeTruthy();
 expect((screen.getAllByPlaceholderText('Add details if needed…')[0] as HTMLTextAreaElement).value).toBe('Aceite 5W-30');
 await user.click(screen.getByRole('button',{name:'Change theme'}));expect(document.documentElement.dataset.theme).toBe('light');
 });
 it('generates a paginated PDF with answers, unanswered fields and long observations',()=>{
 const answers=initialAnswers();answers.oil=toggleOption(answers.oil,0);answers.oil.notes='Aceite 5W-30';answers.brakes.notes='Revisar pastillas. '.repeat(500);
 const doc=createReport('es',{customer:'Cliente de prueba',registration:'ABC123',make:'Toyota',mileage:'100000',mechanic:'Gabriel',date:'2026-10-07'},answers,'Próxima revisión en 6 meses');
 const pdf=doc.output();expect(pdf.startsWith('%PDF-')).toBe(true);expect(doc.getNumberOfPages()).toBeGreaterThan(1);expect(pdf).toContain('ABC123');expect(pdf).toContain('Aceite 5W-30');expect(pdf).toContain('Sin respuesta');
 });
});
