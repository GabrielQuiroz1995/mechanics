import { jsPDF } from 'jspdf';
import { questions, options, type Language, type Answers, type Vehicle } from './questions';
export function createReport(lang:Language, vehicle:Vehicle, answers:Answers, notes:string) {
  const doc=new jsPDF(); let y=0;
  const heading=()=>{doc.setFillColor(18,18,22);doc.rect(0,0,210,32,'F');doc.setTextColor(235,30,45);doc.setFont('helvetica','bold');doc.setFontSize(23);doc.text('G-FORCE',16,16);doc.setTextColor(255);doc.setFontSize(10);doc.text('MOTORS',16,23);doc.setFontSize(11);doc.text(lang==='es'?'INFORME DE REVISIÓN':'VEHICLE INSPECTION REPORT',194,20,{align:'right'});doc.setTextColor(35);y=43;};
  heading();
  const write=(text:string,size=11,bold=false)=>{doc.setFontSize(size);doc.setFont('helvetica',bold?'bold':'normal');const lines=doc.splitTextToSize(text,178) as string[];for(const line of lines){if(y>275){doc.addPage();heading();}doc.text(line,16,y);y+=size*0.45+2;} };
  const labels=lang==='es'?['Cliente','Matrícula','Vehículo','Kilometraje','Mecánico','Fecha']:['Customer','Registration','Vehicle','Mileage','Mechanic','Date'];
  [vehicle.customer,vehicle.registration,vehicle.make,vehicle.mileage,vehicle.mechanic,vehicle.date].forEach((v,i)=>write(`${labels[i]}: ${v||'—'}`));y+=5;
  questions.forEach((q,i)=>{if(y>244){doc.addPage();heading();}write(`${String(i+1).padStart(2,'0')}. ${q[lang]}`,11,true);const a=answers[q.id];write(`${lang==='es'?'Respuesta':'Answer'}: ${a.option===null?(lang==='es'?'Sin respuesta':'Unanswered'):options[lang][a.option]}`);if(a.notes.trim())write(`${lang==='es'?'Observaciones':'Notes'}: ${a.notes.trim()}`);y+=5;});
  if(notes.trim()){write(lang==='es'?'Observaciones generales':'General notes',12,true);write(notes.trim());}
  const pages=doc.getNumberOfPages();for(let p=1;p<=pages;p++){doc.setPage(p);doc.setFontSize(9);doc.setTextColor(110);doc.text(`G.force Motors | ${p} / ${pages}`,16,289);}
  return doc;
}
export function downloadReport(lang:Language,vehicle:Vehicle,answers:Answers,notes:string){const safe=vehicle.registration.replace(/[^a-zA-Z0-9-]/g,'').slice(0,30)||'vehicle';createReport(lang,vehicle,answers,notes).save(`G-force-${safe}-${vehicle.date}.pdf`);}
