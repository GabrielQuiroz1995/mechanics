export type Language = 'es' | 'en';
export const questions = [
  { id:'oil', section:'maintenance', es:'¿Se realizó el cambio de aceite?', en:'Was the engine oil changed?' },
  { id:'filter', section:'maintenance', es:'¿Se reemplazó el filtro de aceite?', en:'Was the oil filter replaced?' },
  { id:'air', section:'maintenance', es:'¿El filtro de aire está en buen estado?', en:'Is the air filter in good condition?' },
  { id:'coolant', section:'maintenance', es:'¿El nivel de refrigerante es correcto?', en:'Is the coolant level correct?' },
  { id:'brakes', section:'safety', es:'¿Los frenos funcionan correctamente?', en:'Are the brakes working correctly?' },
  { id:'tires', section:'safety', es:'¿Los neumáticos y su presión están en buen estado?', en:'Are the tires and tire pressure in good condition?' },
  { id:'lights', section:'safety', es:'¿Todas las luces funcionan correctamente?', en:'Are all lights working correctly?' },
  { id:'battery', section:'general', es:'¿La batería está en buen estado?', en:'Is the battery in good condition?' },
  { id:'leaks', section:'general', es:'¿El vehículo está libre de fugas visibles?', en:'Is the vehicle free of visible leaks?' },
  { id:'road', section:'general', es:'¿Se realizó una prueba de conducción?', en:'Was a road test completed?' },
] as const;
export type Answer = { option: number | null; notes: string };
export type Answers = Record<string, Answer>;
export type Vehicle = { customer:string; registration:string; make:string; mileage:string; mechanic:string; date:string };
export const initialAnswers = ():Answers => Object.fromEntries(questions.map(q=>[q.id,{option:null,notes:''}]));
export function toggleOption(answer:Answer, option:number):Answer { return {...answer,option:answer.option===option?null:option}; }
export const options = {es:['Sí','No','No aplica'],en:['Yes','No','Not applicable']};
