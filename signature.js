'use strict';
(() => {
  const params=new URLSearchParams(location.search),token=params.get('token'),canvas=document.getElementById('signatureCanvas'),ctx=canvas.getContext('2d'),status=document.getElementById('status');
  document.getElementById('context').textContent=[params.get('expert'),params.get('project')].filter(Boolean).join(' · ');
  const ratio=Math.min(window.devicePixelRatio||1,3),rect=canvas.getBoundingClientRect();canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.scale(ratio,ratio);ctx.strokeStyle='#162a42';ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';
  let drawing=false,ink=0,sent=false;
  const point=e=>{const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
  canvas.addEventListener('pointerdown',e=>{if(sent)return;drawing=true;canvas.setPointerCapture(e.pointerId);const [x,y]=point(e);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+.1,y+.1);ctx.stroke();ink++;e.preventDefault();});
  canvas.addEventListener('pointermove',e=>{if(!drawing||sent)return;ctx.lineTo(...point(e));ctx.stroke();ink++;e.preventDefault();});
  for(const event of ['pointerup','pointercancel'])canvas.addEventListener(event,()=>drawing=false);
  document.getElementById('clear').addEventListener('click',()=>{if(sent)return;ctx.clearRect(0,0,canvas.width/ratio,canvas.height/ratio);ink=0;status.textContent='已清空，请重新签字。';});
  document.getElementById('send').addEventListener('click',()=>{if(!token){status.textContent='签字链接无效，请回到评分页重新生成。';return;}if(ink<6){status.textContent='请先完整手写本人签名。';return;}const message={token,data:canvas.toDataURL('image/png')};let delivered=false;if(typeof BroadcastChannel!=='undefined'){const channel=new BroadcastChannel('tourism-v2-signature');channel.postMessage(message);channel.close();delivered=true;}try{localStorage.setItem('tourism-v2-signature-result',JSON.stringify(message));delivered=true;}catch{}if(!delivered){status.textContent='当前浏览器无法回传，请下载或截图签字，在评分页上传图片。';return;}sent=true;document.getElementById('send').disabled=true;document.getElementById('clear').disabled=true;status.textContent='签字已发送。请返回评分页核对预览；若未收到，请重新生成链接。最终提交在评分页完成。';});
})();
