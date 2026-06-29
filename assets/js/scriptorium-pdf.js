(function(){'use strict';
var PAGE_W=210,PAGE_H=297,MARGIN=20,CONTENT_W=PAGE_W-2*MARGIN,LINE_H=5.2;
function esc(t){var d=document.createElement('textarea');d.innerHTML=t;return d.value||t}
window.scribeGeneratePDF=async function(bookId,era,explicitFileId){
if(!window.jspdf){if(window.Scr&&window.Scr.toast)window.Scr.toast('PDF library not loaded.','error');return}
var fileId=explicitFileId||bookId.toUpperCase().replace(/\s+/g,'_').replace(/[^A-Z0-9_]/g,'');
try{
var resp=await fetch('assets/data/bible-text/'+fileId+'.json');
if(!resp.ok)throw new Error('Not found');
var data=await resp.json();
}catch(e){if(window.Scr&&window.Scr.toast)window.Scr.toast('Could not load text for '+bookId,'error');return}
var doc=new window.jspdf.jsPDF('p','mm','a4');
var y=MARGIN;
// Cover
doc.setFont('helvetica','bold');doc.setFontSize(28);
doc.text((data.title||bookId).toUpperCase(),PAGE_W/2,80,{align:'center'});
doc.setFont('helvetica','normal');doc.setFontSize(14);
var el=era==='ot'?'Old Testament':era==='nt'?'New Testament':'Ethiopian Orthodox Tewahedo Canon';
doc.text(el,PAGE_W/2,96,{align:'center'});
if(data.writer){doc.setFontSize(11);doc.text('Attributed to '+data.writer,PAGE_W/2,108,{align:'center'})}
doc.setFontSize(9);doc.setTextColor(100);
var ds=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
doc.text('Generated from Scriptorium Digital Archive — '+ds,PAGE_W/2,PAGE_H-MARGIN,{align:'center'});
doc.setTextColor(0);
var td=document.getElementById('readerTextDisplay');
if(td)td.style.display='block';
// Chapters
if(data.chapters)for(var ci=0;ci<data.chapters.length;ci++){
var ch=data.chapters[ci];
doc.addPage();y=MARGIN;
doc.setFont('helvetica','bold');doc.setFontSize(18);
doc.text('CHAPTER '+ch.number,MARGIN,y);y+=12;
doc.setFont('times','normal');doc.setFontSize(11);
if(ch.verses){
var buf='';
for(var vi=0;vi<ch.verses.length;vi++){
var vn=(vi+1),vt=esc(ch.verses[vi]);
var chunk=vn+' '+vt+' ';
var test=buf+chunk;
var lines=doc.splitTextToSize(test,CONTENT_W);
if(lines.length>2&&buf.length>0){
var out=doc.splitTextToSize(buf.trim(),CONTENT_W);
for(var li=0;li<out.length;li++){
if(y+LINE_H>PAGE_H-MARGIN){doc.addPage();y=MARGIN;doc.setFont('times','normal');doc.setFontSize(11)}
doc.text(out[li],MARGIN,y);y+=LINE_H}
buf=chunk}else{buf=test}
}
if(buf.trim()){
var out=doc.splitTextToSize(buf.trim(),CONTENT_W);
for(var li=0;li<out.length;li++){
if(y+LINE_H>PAGE_H-MARGIN){doc.addPage();y=MARGIN;doc.setFont('times','normal');doc.setFontSize(11)}
doc.text(out[li],MARGIN,y);y+=LINE_H}
}
}
}
var fn=(data.title||bookId).toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'')+'_scriptorium.pdf';
doc.save(fn);
};
})();